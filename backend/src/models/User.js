const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['student', 'teacher', 'guest'],
      required: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      sparse: true, // allows multiple documents without mobileNumber (e.g. guests)
      trim: true,
    },
    pinHash: {
      type: String,
      select: false, // hidden by default in queries
    },
    name: {
      type: String,
      required: function () {
        return this.role !== 'guest';
      },
      trim: true,
    },
    grade: {
      type: String,
      trim: true,
    },
    gradeBand: {
      type: String,
      enum: ['nursery_1', 'class_2_4', 'class_5_8', 'class_9_10'],
      default: 'class_2_4',
    },
    schoolCode: {
      type: String,
      trim: true,
    },
    assignedGrades: [
      {
        type: String,
        trim: true,
      },
    ],
    isGuest: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      index: { expires: 0 }, // TTL index using expiresAt value
    },
    avatar: {
      base: {
        type: String,
        default: 'avatar_default',
      },
      unlocks: [
        {
          type: String,
        },
      ],
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    refreshTokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to compare candidate PIN with hashed PIN
userSchema.methods.comparePin = async function (candidatePin) {
  if (!this.pinHash) return false;
  return await bcrypt.compare(candidatePin, this.pinHash);
};

// Static helper to hash PIN
userSchema.statics.hashPin = async function (pin) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pin, salt);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
