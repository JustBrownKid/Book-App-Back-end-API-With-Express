const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController");
const UserValidator = require('../validations/UserValidator');
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.get('/get', UserController.getUsers);
router.post('/add', UserValidator, UserController.addUser);
router.put('/update', UserValidator, UserController.putUser);
router.post('/email', AuthMiddleware, UserController.emailSend);

module.exports = router;
