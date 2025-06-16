
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName : {
    type: String ,
    required : true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);

/*
There is no need to add any code at the placeholder. 
The schema and model export are correct. 
If you are seeing a debug error, check your import paths, MongoDB connection, and ensure you are not redefining the model elsewhere.
*/