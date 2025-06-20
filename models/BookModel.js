// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  page: {
    type: Number,
    required: true,
  }
},{
  timestamps: true,
});

module.exports =  mongoose.model('Book', bookSchema);
