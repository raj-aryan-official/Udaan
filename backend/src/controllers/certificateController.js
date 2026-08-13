const GamificationProfile = require('../models/GamificationProfile');
const gamificationConfig = require('../config/gamificationConfig');

// @desc    Get milestone certificates for current user (Class 9 & 10 only)
// @route   GET /certificates/me
// @access  Private (Class 9-10 only)
const getMyCertificates = async (req, res, next) => {
  try {
    const userGradeBand = req.user.gradeBand;
    const config = gamificationConfig[userGradeBand] || gamificationConfig.class_2_4;

    if (!config.certificatesEnabled) {
      return res.status(403).json({
        success: false,
        message: 'Certificates are only enabled for Class 9 and Class 10 students.',
      });
    }

    const profile = await GamificationProfile.findOne({ userId: req.user._id });

    res.status(200).json({
      success: true,
      count: profile ? profile.certificates.length : 0,
      data: profile ? profile.certificates : [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyCertificates,
};
