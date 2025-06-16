const { body } = require('express-validator');

const UserValidation = [
  body('userName')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 6 }).withMessage('Username must be at least 6 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),    
];

module.exports = UserValidation;
