const User = require('../models/User');
const GamificationProfile = require('../models/GamificationProfile');
const { deriveGradeBand } = require('../services/gradeBandService');

// @desc    Get current user profile
// @route   GET /users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        mobileNumber: user.mobileNumber,
        grade: user.grade,
        gradeBand: user.gradeBand,
        schoolCode: user.schoolCode,
        assignedGrades: user.assignedGrades,
        isGuest: user.isGuest,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PATCH /users/me
// @access  Private
const updateMe = async (req, res, next) => {
  try {
    const { name, grade, avatar, schoolCode, assignedGrades } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (name !== undefined) user.name = name;
    if (avatar !== undefined) {
      user.avatar = {
        base: avatar.base || user.avatar.base,
        unlocks: avatar.unlocks || user.avatar.unlocks,
      };
    }

    if (user.role === 'teacher') {
      if (schoolCode !== undefined) user.schoolCode = schoolCode;
      if (assignedGrades !== undefined) user.assignedGrades = assignedGrades;
    }

    if (user.role === 'student' || user.role === 'guest') {
      if (grade !== undefined && grade !== user.grade) {
        user.grade = grade;
        const newGradeBand = deriveGradeBand(grade);
        user.gradeBand = newGradeBand;

        // Update linked GamificationProfile gradeBand
        await GamificationProfile.findOneAndUpdate(
          { userId: user._id },
          { gradeBand: newGradeBand }
        );
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        mobileNumber: user.mobileNumber,
        grade: user.grade,
        gradeBand: user.gradeBand,
        schoolCode: user.schoolCode,
        assignedGrades: user.assignedGrades,
        isGuest: user.isGuest,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  updateMe,
};
