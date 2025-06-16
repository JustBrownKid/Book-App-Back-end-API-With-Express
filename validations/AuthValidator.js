const { check } = require('express-validator');

exports.validateRegister = [
  check('userName').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.validateLogin = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required')
];

exports.validateOtp = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('otp').notEmpty().withMessage('OTP is required')
];

exports.validateResendOtp = [
  check('email').isEmail().withMessage('Valid email is required')
];
