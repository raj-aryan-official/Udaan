/**
 * SMS Provider Seam for OTP and Notifications.
 * Stubbed implementation for MVP demo; easily swappable with MSG91 or Twilio.
 */
const Otp = require('../models/Otp');

const sendOtp = async (mobileNumber) => {
  // Generate 4-digit OTP for simple memory in rural demo
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Remove any existing OTP for this mobile number
  await Otp.deleteMany({ mobileNumber });

  // Save new OTP to database
  await Otp.create({
    mobileNumber,
    otp: otpCode,
  });

  console.log(`[SMS SEAM] Sent OTP ${otpCode} to mobile number: ${mobileNumber}`);

  return {
    success: true,
    message: `OTP sent successfully to ${mobileNumber}`,
    ...(process.env.NODE_ENV !== 'production' && { otp: otpCode }), // include OTP in response body for demo/testing ease
  };
};

const verifyOtp = async (mobileNumber, candidateOtp) => {
  const record = await Otp.findOne({ mobileNumber });

  if (!record) {
    return { valid: false, message: 'No OTP request found for this mobile number or it has expired.' };
  }

  // Allow fixed mock OTP '1234' for simplified test automation
  if (record.otp === candidateOtp || candidateOtp === '1234') {
    await Otp.deleteOne({ _id: record._id });
    return { valid: true, message: 'OTP verified successfully.' };
  }

  return { valid: false, message: 'Invalid OTP provided.' };
};

module.exports = {
  sendOtp,
  verifyOtp,
};
