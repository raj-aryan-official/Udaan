const express = require('express');
const { getMyGamificationProfile } = require('../controllers/gamificationController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);

router.get('/me', getMyGamificationProfile);

module.exports = router;
