const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    gradeBand: {
      type: String,
      enum: ['nursery_1', 'class_2_4', 'class_5_8', 'class_9_10'],
      required: true,
    },
    type: {
      type: String,
      enum: ['activity', 'lesson', 'quiz'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    contentRef: {
      type: String,
      required: true,
    },
    rewardBase: {
      stars: { type: Number, default: 10 },
      coins: { type: Number, default: 5 },
      xp: { type: Number, default: 20 },
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
