const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const {
  validateRegister,
  validateLogin,
  validateOtp,
  validateResendOtp
} = require('../validations/AuthValidator');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/otp/verify', validateOtp, AuthController.verifyOtp);
router.post('/otp/resend', validateResendOtp, AuthController.resendOtp);

module.exports = router;
