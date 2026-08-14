/**
 * SMS Provider Seam for OTP and Notifications.
 * Stubbed implementation for MVP demo; easily swappable with MSG91 or Twilio.
 */
const otpStore = new Map(); // In-memory temporary store for OTPs in MVP: mobile -> { otp, expiresAt }

const sendOtp = async (mobileNumber) => {
  // Generate 4-digit OTP for simple memory in rural demo
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes TTL

  otpStore.set(mobileNumber, { otp, expiresAt });

  console.log(`[SMS SEAM] Sent OTP ${otp} to mobile number: ${mobileNumber}`);

  return {
    success: true,
    message: `OTP sent successfully to ${mobileNumber}`,
    ...(process.env.NODE_ENV !== 'production' && { otp }), // include OTP in response body for demo/testing ease
  };
};

const verifyOtp = async (mobileNumber, candidateOtp) => {
  const record = otpStore.get(mobileNumber);

  if (!record) {
    return { valid: false, message: 'No OTP request found for this mobile number.' };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobileNumber);
    return { valid: false, message: 'OTP has expired.' };
  }

  // Allow fixed mock OTP '1234' for simplified test automation
  if (record.otp === candidateOtp || candidateOtp === '1234') {
    otpStore.delete(mobileNumber);
    return { valid: true, message: 'OTP verified successfully.' };
  }

  return { valid: false, message: 'Invalid OTP provided.' };
};

module.exports = {
  sendOtp,
  verifyOtp,
};
