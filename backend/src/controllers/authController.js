const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const User = require('../models/User');
const GamificationProfile = require('../models/GamificationProfile');
const { generateAccessToken, generateRefreshToken } = require('../middleware/auth');
const { deriveGradeBand } = require('../services/gradeBandService');
const smsProvider = require('../services/smsProvider');

// @desc    Register a new student or teacher
// @route   POST /auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { mobileNumber, pin, role, name, grade, schoolCode, assignedGrades } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this mobile number is already registered.',
      });
    }

    const pinHash = await User.hashPin(pin);
    const gradeBand = role === 'student' ? deriveGradeBand(grade) : 'class_2_4';

    const user = await User.create({
      role: role || 'student',
      mobileNumber,
      pinHash,
      name,
      grade: role === 'student' ? grade : undefined,
      gradeBand,
      schoolCode,
      assignedGrades: role === 'teacher' ? assignedGrades : undefined,
      isGuest: false,
    });

    // Create GamificationProfile for student/teacher
    await GamificationProfile.create({
      userId: user._id,
      gradeBand,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      accessToken,
      refreshToken,
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
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user with mobile & PIN
// @route   POST /auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { mobileNumber, pin } = req.body;

    const user = await User.findOne({ mobileNumber }).select('+pinHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid mobile number or PIN.',
      });
    }

    const isMatch = await user.comparePin(pin);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid mobile number or PIN.',
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
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
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    One-tap guest session creation
// @route   POST /auth/guest
// @access  Public
const guest = async (req, res, next) => {
  try {
    const { grade } = req.body || {};
    const gradeBand = deriveGradeBand(grade || '2');

    // Ephemeral guest user with 48h TTL
    const guestUser = await User.create({
      role: 'guest',
      name: `Guest Learner ${Math.floor(1000 + Math.random() * 9000)}`,
      grade: grade || '2',
      gradeBand,
      isGuest: true,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h TTL
    });

    // Create 1:1 GamificationProfile for guest
    await GamificationProfile.create({
      userId: guestUser._id,
      gradeBand,
    });

    const accessToken = generateAccessToken(guestUser);
    const refreshToken = generateRefreshToken(guestUser);

    res.status(201).json({
      success: true,
      message: 'Guest session created successfully',
      accessToken,
      refreshToken,
      user: {
        id: guestUser._id,
        role: guestUser.role,
        name: guestUser.name,
        grade: guestUser.grade,
        gradeBand: guestUser.gradeBand,
        isGuest: true,
        expiresAt: guestUser.expiresAt,
        avatar: guestUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /auth/refresh
// @access  Public
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_rural_education_2026'
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token.',
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Request PIN reset OTP
// @route   POST /auth/pin-reset/request-otp
// @access  Public
const requestPinResetOtp = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;

    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user registered with this mobile number.',
      });
    }

    const result = await smsProvider.sendOtp(mobileNumber);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and reset PIN
// @route   POST /auth/pin-reset/verify
// @access  Public
const verifyPinResetAndChange = async (req, res, next) => {
  try {
    const { mobileNumber, otp, newPin } = req.body;

    const verification = await smsProvider.verifyOtp(mobileNumber, otp);
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: verification.message,
      });
    }

    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.pinHash = await User.hashPin(newPin);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'PIN updated successfully. Please login with your new PIN.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Convert guest session to permanent account without losing progress
// @route   POST /auth/convert-guest
// @access  Private (Guest Token)
const convertGuest = async (req, res, next) => {
  try {
    if (!req.user.isGuest) {
      return res.status(400).json({
        success: false,
        message: 'This account is already a registered user.',
      });
    }

    const { mobileNumber, pin, name, role, grade, schoolCode, assignedGrades } = req.body;

    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this mobile number is already registered.',
      });
    }

    const pinHash = await User.hashPin(pin);
    const gradeBand = role === 'student' ? deriveGradeBand(grade) : 'class_2_4';

    const user = await User.findById(req.user._id);
    user.role = role || 'student';
    user.mobileNumber = mobileNumber;
    user.pinHash = pinHash;
    user.name = name;
    user.grade = role === 'student' ? grade : undefined;
    user.gradeBand = gradeBand;
    user.schoolCode = role === 'teacher' ? schoolCode : undefined;
    user.assignedGrades = role === 'teacher' ? assignedGrades : undefined;
    user.isGuest = false;
    user.expiresAt = undefined; // Remove TTL index expiration
    await user.save();

    // Update existing GamificationProfile gradeBand if updated
    await GamificationProfile.findOneAndUpdate(
      { userId: user._id },
      { gradeBand },
      { new: true }
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Guest account successfully converted to registered user.',
      accessToken,
      refreshToken,
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
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  guest,
  refresh,
  requestPinResetOtp,
  verifyPinResetAndChange,
  convertGuest,
};
