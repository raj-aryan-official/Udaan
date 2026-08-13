const express = require('express');
const { getBadges } = require('../controllers/gamificationController');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);

router.get('/', getBadges);

module.exports = router;
