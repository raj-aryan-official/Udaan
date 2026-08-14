const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 600 }, // TTL index: 10 minutes (600 seconds)
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
