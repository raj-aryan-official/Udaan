const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    gradeBands: [
      {
        type: String,
        enum: ['nursery_1', 'class_2_4', 'class_5_8', 'class_9_10'],
      },
    ],
    criteria: {
      type: {
        type: String,
        enum: ['stars_earned', 'activities_completed', 'streak_days', 'quizzes_mastered'],
        required: true,
      },
      threshold: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;
