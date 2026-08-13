const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    gradeBand: {
      type: String,
      enum: ['nursery_1', 'class_2_4', 'class_5_8', 'class_9_10'],
      required: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    criteria: {
      subject: { type: String }, // e.g. 'Mathematics' or 'All'
      targetCount: { type: Number, default: 3 },
    },
    bonusReward: {
      stars: { type: Number, default: 20 },
      coins: { type: Number, default: 15 },
      xp: { type: Number, default: 50 },
    },
  },
  {
    timestamps: true,
  }
);

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
