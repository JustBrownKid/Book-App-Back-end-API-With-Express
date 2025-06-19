const sendResponse = require('../utils/response');
const Book = require('../models/BookModel')




exports.get = async( req , res )=>{
    const book = await Book.find()
    sendResponse( res , 200 , 'Book controller is OK' , true , book)
};