const mongoose = require('mongoose');

const gamificationProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    gradeBand: {
      type: String,
      enum: ['nursery_1', 'class_2_4', 'class_5_8', 'class_9_10'],
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
      min: 0,
    },
    coins: {
      type: Number,
      default: 0,
      min: 0,
    },
    xp: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActivityDate: { type: Date, default: null },
    },
    badges: [
      {
        badgeCode: { type: String, required: true },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
    stickers: [
      {
        type: String,
      },
    ],
    plantStage: {
      type: Number,
      default: 1, // Nursery plant growth stage (1 - 5)
    },
    petMood: {
      type: String,
      default: 'happy', // Nursery pet mood
    },
    storyProgress: {
      type: Map,
      of: String,
      default: {},
    },
    certificates: [
      {
        courseId: { type: String, required: true },
        title: { type: String, required: true },
        issuedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GamificationProfile = mongoose.model('GamificationProfile', gamificationProfileSchema);

module.exports = GamificationProfile;
