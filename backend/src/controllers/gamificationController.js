const GamificationProfile = require('../models/GamificationProfile');
const Badge = require('../models/Badge');
const { grantRewards } = require('../services/rewardEngine');

// @desc    Complete an activity and trigger grantRewards
// @route   POST /activities/:id/complete
// @access  Private
const completeActivity = async (req, res, next) => {
  try {
    const activityId = req.params.id;
    const result = req.body || {}; // e.g. { score: 100 }

    const rewardsPayload = await grantRewards(req.user._id, activityId, result);

    res.status(200).json(rewardsPayload);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's gamification profile
// @route   GET /gamification/me
// @access  Private
const getMyGamificationProfile = async (req, res, next) => {
  try {
    let profile = await GamificationProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = await GamificationProfile.create({
        userId: req.user._id,
        gradeBand: req.user.gradeBand,
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get badge catalog
// @route   GET /badges
// @access  Public / Private
const getBadges = async (req, res, next) => {
  try {
    const { gradeBand } = req.query;
    const filter = {};
    if (gradeBand) {
      filter.gradeBands = gradeBand;
    }

    const badges = await Badge.find(filter);

    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  completeActivity,
  getMyGamificationProfile,
  getBadges,
};
