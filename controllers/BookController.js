const sendResponse = require('../utils/response');
const Book = require('../models/BookModel')
const mongoose = require('mongoose');



exports.get = async( req , res ) => {
    const book = await Book.find()
    sendResponse( res , 200 , 'Book controller is OK' , true , book)
};

exports.post = async(req, res) => {
    const book = req.body
    try {
        const newBook = new Book(book);
        await newBook.save()
        sendResponse(res, 200, 'Route is ok', true, book);
    } catch (error) {
        sendResponse(res , 500 , 'Book add fill' , false , error.message )
    }
    
};

exports.bookById = async (req , res) => {
    const id =  req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, 'Invalid book ID format', false, null);
        }
    try {
        const book = await Book.findById(id);
        if (!book) {
            return sendResponse(res, 404, 'Book not found', false, null);
        }
        sendResponse(res, 200, 'Book data get success', true, book);
    } catch (error) {
        sendResponse(res , 500 , 'Book add fill' , false , error.message )
    }
}
