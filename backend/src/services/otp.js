const crypto = require('crypto');

// Fake OTP service (replace with Twilio/SendGrid for production)
const sendOTP = async (phone, email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpId = crypto.randomBytes(16).toString('hex');
  console.log(`OTP sent to ${phone}/${email}: ${otp}`); // Simulate sending
  return { id: otpId, otp }; // Store in Redis in production
};

const validateOTP = async (otp, otpId) => {
  // Simulate validation (use Redis in production)
  return otp === '123456'; // Hard-coded for demo
};

module.exports = { sendOTP, validateOTP };