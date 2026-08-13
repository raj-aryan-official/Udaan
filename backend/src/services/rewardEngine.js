const User = require('../models/User');
const Content = require('../models/Content');
const GamificationProfile = require('../models/GamificationProfile');
const ActivityCompletion = require('../models/ActivityCompletion');
const Badge = require('../models/Badge');
const Mission = require('../models/Mission');
const MissionProgress = require('../models/MissionProgress');
const gamificationConfig = require('../config/gamificationConfig');

/**
 * Centralized Reward Engine Function.
 * Every /activities/:id/complete call passes through this function.
 */
async function grantRewards(userId, activityId, result = {}) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const content = await Content.findById(activityId);
  if (!content) throw new Error('Activity content not found');

  const config = gamificationConfig[user.gradeBand] || gamificationConfig.class_2_4;

  let profile = await GamificationProfile.findOne({ userId });
  if (!profile) {
    profile = await GamificationProfile.create({
      userId,
      gradeBand: user.gradeBand,
    });
  }

  // 1. Calculate Base Rewards based on config flags
  const scoreFactor = (result.score || 100) / 100;
  const baseReward = content.rewardBase || { stars: 10, coins: 5, xp: 20 };

  let starsGranted = 0;
  let coinsGranted = 0;
  let xpGranted = 0;

  if (config.unlocks.includes('stars')) {
    starsGranted = Math.round((baseReward.stars || 10) * scoreFactor);
    // If XP disabled, convert XP reward into extra stars
    if (!config.xpEnabled && baseReward.xp > 0) {
      starsGranted += Math.floor(baseReward.xp / 10);
    }
  }

  if (config.coinsEnabled) {
    coinsGranted = Math.round((baseReward.coins || 5) * scoreFactor);
  }

  if (config.xpEnabled) {
    xpGranted = Math.round((baseReward.xp || 20) * scoreFactor);
  }

  // 2. Update Profile Totals
  profile.stars += starsGranted;
  profile.coins += coinsGranted;
  profile.xp += xpGranted;

  // Level Up calculation
  const oldLevel = profile.level || 1;
  let newLevel = oldLevel;
  let leveledUp = false;
  if (config.xpEnabled) {
    newLevel = Math.floor(profile.xp / 100) + 1;
    if (newLevel > oldLevel) {
      leveledUp = true;
      profile.level = newLevel;
    }
  }

  // 3. Streak Calculation
  const now = new Date();
  const lastDate = profile.streak.lastActivityDate;
  if (!lastDate) {
    profile.streak.current = 1;
  } else {
    const todayStr = now.toISOString().split('T')[0];
    const lastStr = new Date(lastDate).toISOString().split('T')[0];
    const diffTime = Math.abs(new Date(todayStr) - new Date(lastStr));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      profile.streak.current += 1;
    } else if (diffDays > 1) {
      profile.streak.current = 1;
    }
    // If diffDays === 0 (same day), keep current streak as is
  }
  profile.streak.longest = Math.max(profile.streak.longest, profile.streak.current);
  profile.streak.lastActivityDate = now;

  // 4. Nursery specific mechanics (Plant Growth & Pet Mood)
  let plantGrew = false;
  if (user.gradeBand === 'nursery_1') {
    const totalCompletions = await ActivityCompletion.countDocuments({ userId });
    const calculatedPlantStage = Math.min(5, Math.floor((totalCompletions + 1) / 2) + 1);
    if (calculatedPlantStage > profile.plantStage) {
      plantGrew = true;
      profile.plantStage = calculatedPlantStage;
    }
    profile.petMood = 'joyful';
  }

  // 5. Evaluate Badges
  const newlyEarnedBadges = [];
  const candidateBadges = await Badge.find({ gradeBands: user.gradeBand });

  const existingBadgeCodes = new Set(profile.badges.map((b) => b.badgeCode));
  const totalCompletions = (await ActivityCompletion.countDocuments({ userId })) + 1;

  for (const badge of candidateBadges) {
    if (existingBadgeCodes.has(badge.code)) continue;

    let qualifies = false;
    const { type, threshold } = badge.criteria;

    if (type === 'stars_earned' && profile.stars >= threshold) qualifies = true;
    if (type === 'activities_completed' && totalCompletions >= threshold) qualifies = true;
    if (type === 'streak_days' && profile.streak.current >= threshold) qualifies = true;
    if (type === 'quizzes_mastered' && content.type === 'quiz' && totalCompletions >= threshold) qualifies = true;

    if (qualifies) {
      profile.badges.push({ badgeCode: badge.code, earnedAt: now });
      newlyEarnedBadges.push(badge);
    }
  }

  // 6. Milestone Certificates for class_9_10
  let newlyIssuedCertificate = null;
  if (config.certificatesEnabled && totalCompletions >= 3) {
    const hasCert = profile.certificates.some((c) => c.courseId === 'class10_mastery');
    if (!hasCert) {
      newlyIssuedCertificate = {
        courseId: 'class10_mastery',
        title: 'Class 10 Academic Milestone Certificate',
        issuedAt: now,
      };
      profile.certificates.push(newlyIssuedCertificate);
    }
  }

  await profile.save();

  // 7. Mission Progress Update
  const newlyCompletedMissions = [];
  const activeMissions = await Mission.find({ gradeBand: user.gradeBand });
  const periodKey = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`;

  for (const mission of activeMissions) {
    let mp = await MissionProgress.findOne({ userId, missionId: mission._id, periodKey });
    if (!mp) {
      mp = new MissionProgress({
        userId,
        missionId: mission._id,
        periodKey,
        progress: 0,
        status: 'in_progress',
      });
    }

    if (mp.status !== 'completed') {
      mp.progress += 1;
      if (mp.progress >= mission.criteria.targetCount) {
        mp.status = 'completed';
        newlyCompletedMissions.push(mission);

        // Grant mission bonus rewards
        if (mission.bonusReward) {
          if (config.unlocks.includes('stars')) profile.stars += mission.bonusReward.stars || 0;
          if (config.coinsEnabled) profile.coins += mission.bonusReward.coins || 0;
          if (config.xpEnabled) profile.xp += mission.bonusReward.xp || 0;
        }
      }
      await mp.save();
    }
  }

  if (newlyCompletedMissions.length > 0) {
    await profile.save();
  }

  // 8. Log Activity Completion
  const log = await ActivityCompletion.create({
    userId,
    activityId,
    completedAt: now,
    score: result.score || 100,
    rewardsGranted: {
      stars: starsGranted,
      coins: coinsGranted,
      xp: xpGranted,
    },
  });

  // 9. Build Rewards Payload
  return {
    success: true,
    activityId,
    rewardsGranted: {
      stars: starsGranted,
      coins: coinsGranted,
      xp: xpGranted,
    },
    profile: {
      stars: profile.stars,
      coins: profile.coins,
      xp: profile.xp,
      level: profile.level,
      streak: profile.streak,
      plantStage: profile.plantStage,
      petMood: profile.petMood,
    },
    leveledUp,
    newLevel: leveledUp ? newLevel : undefined,
    plantGrew,
    newBadges: newlyEarnedBadges,
    newCertificates: newlyIssuedCertificate ? [newlyIssuedCertificate] : [],
    completedMissions: newlyCompletedMissions.map((m) => m.title),
    celebration: {
      trigger: true,
      animation: user.gradeBand === 'nursery_1' ? 'confetti_balloons' : 'star_burst',
      message: plantGrew
        ? '🎉 Fantastic! Your plant grew a new leaf!'
        : '🌟 Great job! Keep learning!',
    },
  };
}

module.exports = {
  grantRewards,
};
