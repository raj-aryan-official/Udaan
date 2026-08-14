const express = require('express');
const { check } = require('express-validator');
const {
  getClassProgress,
  recordClassProgressNote,
  assignTeacherMission,
} = require('../controllers/teacherController');
const { protect, restrictTo } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);
router.use(restrictTo('teacher'));

router.get('/class/:id/progress', getClassProgress);
router.post('/class/:id/progress', recordClassProgressNote);

router.post(
  '/missions',
  [
    check('title', 'Mission title is required').notEmpty(),
    check('grade', 'Grade is required').notEmpty(),
    validate,
  ],
  assignTeacherMission
);

module.exports = router;
