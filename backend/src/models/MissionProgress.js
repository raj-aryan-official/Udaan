const mongoose = require('mongoose');

const missionProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission',
      required: true,
    },
    periodKey: {
      type: String, // e.g. '2026-W32' for weekly or '2026-08-13' for daily
      required: true,
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed'],
      default: 'in_progress',
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

missionProgressSchema.index({ userId: 1, missionId: 1, periodKey: 1 }, { unique: true });

const MissionProgress = mongoose.model('MissionProgress', missionProgressSchema);

module.exports = MissionProgress;
