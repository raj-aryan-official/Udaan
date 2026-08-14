const express = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  guest,
  refresh,
  requestPinResetOtp,
  verifyPinResetAndChange,
  convertGuest,
  requestLoginOtp,
  loginWithOtp,
  logout,
} = require('../controllers/authController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(authLimiter);

router.post(
  '/register',
  [
    check('mobileNumber', 'Mobile number must be a 10-digit number').matches(/^[0-9]{10}$/),
    check('pin', 'PIN must be exactly 4 numeric digits').matches(/^[0-9]{4}$/),
    check('role', 'Role must be student or teacher').isIn(['student', 'teacher']),
    check('name', 'Name is required').notEmpty(),
    validate,
  ],
  register
);

router.post(
  '/login',
  [
    check('mobileNumber', 'Mobile number is required').notEmpty(),
    check('pin', 'PIN is required').notEmpty(),
    validate,
  ],
  login
);

router.post('/guest', guest);

router.post(
  '/refresh',
  [check('refreshToken', 'Refresh token is required').notEmpty(), validate],
  refresh
);

router.post(
  '/pin-reset/request-otp',
  [check('mobileNumber', 'Valid 10-digit mobile number is required').matches(/^[0-9]{10}$/), validate],
  requestPinResetOtp
);

router.post(
  '/pin-reset/verify',
  [
    check('mobileNumber', 'Valid 10-digit mobile number is required').matches(/^[0-9]{10}$/),
    check('otp', 'OTP is required').notEmpty(),
    check('newPin', 'New PIN must be 4 digits').matches(/^[0-9]{4}$/),
    validate,
  ],
  verifyPinResetAndChange
);

router.post(
  '/convert-guest',
  [
    protect,
    check('mobileNumber', 'Mobile number must be a 10-digit number').matches(/^[0-9]{10}$/),
    check('pin', 'PIN must be 4 digits').matches(/^[0-9]{4}$/),
    check('name', 'Name is required').notEmpty(),
    validate,
  ],
  convertGuest
);

router.post(
  '/login-otp/request',
  [check('mobileNumber', 'Valid 10-digit mobile number is required').matches(/^[0-9]{10}$/), validate],
  requestLoginOtp
);

router.post(
  '/login-otp/verify',
  [
    check('mobileNumber', 'Valid 10-digit mobile number is required').matches(/^[0-9]{10}$/),
    check('otp', 'OTP is required').notEmpty(),
    validate,
  ],
  loginWithOtp
);

router.post(
  '/logout',
  [
    protect,
    check('refreshToken', 'Refresh token is required').notEmpty(),
    validate,
  ],
  logout
);

module.exports = router;
