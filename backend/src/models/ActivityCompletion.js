const mongoose = require('mongoose');

const activityCompletionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: Number,
      default: 100, // percentage e.g. 80, 100
    },
    rewardsGranted: {
      stars: { type: Number, default: 0 },
      coins: { type: Number, default: 0 },
      xp: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const ActivityCompletion = mongoose.model('ActivityCompletion', activityCompletionSchema);

module.exports = ActivityCompletion;
