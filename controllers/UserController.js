const sendResponse = require('../utils/response');
const sendEmail = require('../services/EmailService')
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendResponse(res, 201, "Data added successfully", true, users);
  } catch (error) {
    sendResponse(res, 500, "Failed to add data", false, error);
    
  }
};

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, { errors: errors.mapped() });
  }
  try {
   const data = req.body;
   const user = new User(data);     
   await user.save();
    sendResponse(res, 201, "Data added successfully", true, data);
  } catch (error) {
    sendResponse(res, 500, "Failed to add data", false, error);
  }
};

exports.putUser = async (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, "Validation failed", false, { errors: errors.mapped() });
  }
  try {
   const data = req.body;
   const user = new User(data);     
   await user.save();
    sendResponse(res, 201, "Data added successfully", true, data);
  } catch (error) {
    sendResponse(res, 500, "Failed to add data", false, error);
  }
};

exports.emailSend = async (req, res) => {
  const { to, subject, message , value } = req.body;
  try {
    await sendEmail({ to, subject, message, value });
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};


