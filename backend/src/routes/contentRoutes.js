const express = require('express');
const { getContent, getContentById } = require('../controllers/contentController');
const { apiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(apiLimiter);

router.get('/', getContent);
router.get('/:id', getContentById);

module.exports = router;
