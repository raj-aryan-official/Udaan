const express = require('express');
const { completeActivity } = require('../controllers/gamificationController');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);
router.use(protect);

router.post('/:id/complete', completeActivity);

module.exports = router;
