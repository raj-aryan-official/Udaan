const Mission = require('../models/Mission');
const MissionProgress = require('../models/MissionProgress');

// @desc    Get active missions for current user's grade band with progress
// @route   GET /missions/active
// @access  Private
const getActiveMissions = async (req, res, next) => {
  try {
    const userGradeBand = req.user.gradeBand;
    const now = new Date();
    const periodKey = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`;

    const missions = await Mission.find({ gradeBand: userGradeBand });

    const missionProgresses = await MissionProgress.find({
      userId: req.user._id,
      periodKey,
    });

    const progressMap = new Map();
    missionProgresses.forEach((mp) => {
      progressMap.set(mp.missionId.toString(), mp);
    });

    const results = missions.map((mission) => {
      const mp = progressMap.get(mission._id.toString());
      return {
        id: mission._id,
        title: mission.title,
        gradeBand: mission.gradeBand,
        frequency: mission.frequency,
        criteria: mission.criteria,
        bonusReward: mission.bonusReward,
        userProgress: mp ? mp.progress : 0,
        status: mp ? mp.status : 'in_progress',
        isCompleted: mp ? mp.status === 'completed' : false,
      };
    });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActiveMissions,
};
