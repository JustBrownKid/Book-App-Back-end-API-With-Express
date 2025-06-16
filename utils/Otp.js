const Otp = require('../models/Otp');

async function storeOtp(email, otp) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const newOtp = new Otp({
    email,
    otp,
    expiresAt,
    used: false,
  });

  await newOtp.save();
}

function generateOtp() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

module.exports = { generateOtp, storeOtp };
