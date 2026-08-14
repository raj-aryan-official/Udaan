const express = require('express');
const { getMyCertificates } = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);

router.get('/me', getMyCertificates);

module.exports = router;
