const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image : {
        url : String 
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        trim: true
    },
    pages: {
        type: Number
    },
    lanuage: {
        type : String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);