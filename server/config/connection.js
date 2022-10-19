require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URL,
  // || 'mongodb://127.0.0.1:27017/triviyaa',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db= mongoose.connection;

module.exports = db;
