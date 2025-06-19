const express = require('express');
const router = express.Router();
const BookController = require ('../controllers/BookController')

router.get('/' , BookController.get)
router.post('/' , BookController.post)

module.exports = router;
