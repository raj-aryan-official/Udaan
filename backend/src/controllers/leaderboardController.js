const User = require('../models/User');
const GamificationProfile = require('../models/GamificationProfile');
const gamificationConfig = require('../config/gamificationConfig');

// @desc    Get class or school scoped leaderboard rankings
// @route   GET /leaderboard
// @access  Private (Class 5-8 & Class 9-10 only)
const getLeaderboard = async (req, res, next) => {
  try {
    const userGradeBand = req.user.gradeBand;
    const config = gamificationConfig[userGradeBand] || gamificationConfig.class_2_4;

    if (!config.leaderboardEnabled) {
      return res.status(403).json({
        success: false,
        message: 'Leaderboards are only enabled for Class 5 and above.',
      });
    }

    const scope = req.query.scope || 'class'; // 'class' or 'school'
    const type = req.query.type || 'top'; // 'top', 'improved', 'consistent', 'quiz'

    // Build user match query for privacy & scope isolation
    const userQuery = { role: 'student' };

    if (scope === 'class') {
      userQuery.grade = req.user.grade;
      if (req.user.schoolCode) {
        userQuery.schoolCode = req.user.schoolCode;
      }
    } else if (scope === 'school') {
      if (!req.user.schoolCode) {
        return res.status(400).json({
          success: false,
          message: 'School code is required on profile to view school leaderboard.',
        });
      }
      userQuery.schoolCode = req.user.schoolCode;
    }

    const students = await User.find(userQuery).select('_id name grade schoolCode avatar');
    const studentIds = students.map((s) => s._id);

    const studentMap = new Map();
    students.forEach((s) => {
      studentMap.set(s._id.toString(), s);
    });

    let sortOption = { xp: -1 };
    if (type === 'consistent') {
      sortOption = { 'streak.current': -1, xp: -1 };
    } else if (type === 'improved' || type === 'quiz') {
      sortOption = { stars: -1, xp: -1 };
    }

    const profiles = await GamificationProfile.find({ userId: { $in: studentIds } })
      .sort(sortOption)
      .limit(50);

    const leaderboard = profiles.map((profile, index) => {
      const student = studentMap.get(profile.userId.toString());
      return {
        rank: index + 1,
        userId: profile.userId,
        name: student ? student.name : 'Learner',
        grade: student ? student.grade : '',
        schoolCode: student ? student.schoolCode : '',
        avatar: student ? student.avatar : { base: 'default' },
        xp: profile.xp,
        stars: profile.stars,
        level: profile.level,
        streak: profile.streak.current,
        badgeCount: profile.badges.length,
      };
    });

    res.status(200).json({
      success: true,
      scope,
      type,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaderboard,
};
