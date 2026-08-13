const Content = require('../models/Content');
const { deriveGradeBand } = require('../services/gradeBandService');

// @desc    Get list of content (activities, lessons, quizzes) with filtering
// @route   GET /content
// @access  Public / Private
const getContent = async (req, res, next) => {
  try {
    const { grade, gradeBand, subject, type } = req.query;
    const filter = {};

    if (grade) {
      filter.grade = grade;
    } else if (gradeBand) {
      filter.gradeBand = gradeBand;
    } else if (req.user && req.user.gradeBand) {
      filter.gradeBand = req.user.gradeBand;
    }

    if (subject) filter.subject = new RegExp(`^${subject}$`, 'i');
    if (type) filter.type = type;

    const items = await Content.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single content item by ID
// @route   GET /content/:id
// @access  Public / Private
const getContentById = async (req, res, next) => {
  try {
    const item = await Content.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Content item not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContent,
  getContentById,
};
