const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
const AuthMiddleware = require('./middleware/AuthMiddleware')
const sendResponse = require('./utils/response');
const mongoose = require('mongoose');
const UserRoute = require ("./routes/UserRoute")
const AuthRoute = require ("./routes/AuthRoute")

const PORT = process.env.PORT
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running');
});

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});


// Route with middleware 
app.use('/users', UserRoute);
app.use('/', AuthRoute);
app.get('/', (req, res) => {

    sendResponse(res , 200 , 'Data get success!', true , {
        name: 'Express',
        version: '4.17.1'
    });
});