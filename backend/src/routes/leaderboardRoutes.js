const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);

router.get('/', getLeaderboard);

module.exports = router;
