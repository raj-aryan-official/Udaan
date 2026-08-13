const express = require('express');
const { getActiveMissions } = require('../controllers/missionController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);

router.get('/active', getActiveMissions);

module.exports = router;
