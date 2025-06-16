const sendResponse = require('../utils/response');
const sendEmail = require('../services/EmailService');
const { generateOtp, storeOtp } = require('../utils/Otp');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Otp = require('../models/Otp');

const generateToken = (user) => {
  return jwt.sign(
    { userName: user.userName, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, {
      errors: errors.mapped(),
    });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 401, "Invalid email or password", false);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 401, "Invalid email or password", false);

    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendEmail({
      to: email,
      subject: 'Your OTP Code',
      message: 'Please use the following OTP to complete your login:',
      value: otp,
    });

    sendResponse(res, 200, "OTP sent to email", true, { email, otp });
  } catch (error) {
    sendResponse(res, 500, "Login failed", false, error.message);
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, {
      errors: errors.mapped(),
    });
  }

  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendResponse(res, 409, "Email already exists", false);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    sendResponse(res, 201, "Registered successfully", true, {
      email: newUser.email,
      userName: newUser.userName,
    });
  } catch (error) {
    sendResponse(res, 500, "Registration failed", false, error.message);
  }
};

exports.verifyOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, {
      errors: errors.mapped(),
    });
  }

  const { email, otp } = req.body;
  const OtpData = await Otp.findOne({ email }).sort({ createdAt: -1 });
  const UserData = await User.findOne({ email });

  if (!OtpData) return sendResponse(res, 404, "OTP not found for this email", false);
  if (OtpData.otp !== otp) return sendResponse(res, 401, "Invalid OTP", false);
  if (OtpData.expiresAt < Date.now()) return sendResponse(res, 410, "OTP expired", false);
  if (OtpData.used) return sendResponse(res, 410, "OTP already used", false);

  await Otp.updateOne({ _id: OtpData._id }, { used: true });
  const token = generateToken(UserData);
  return sendResponse(res, 200, "OTP verified successfully", true, { token });
};

exports.resendOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, {
      errors: errors.mapped(),
    });
  }

  const { email } = req.body;
  const otp = generateOtp();
  await storeOtp(email, otp);
  await sendEmail({
    to: email,
    subject: 'Your OTP Code',
    message: 'Please use the following OTP to complete your login:',
    value: otp,
  });
  sendResponse(res, 200, "OTP resent to email", true, { email, otp });
};
