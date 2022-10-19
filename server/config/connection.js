require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://triviyaa:YahooThe3estEmail@cluster0.ewe2sqe.mongodb.net/triviyaaDB?retryWrites=true&w=majority",
  // || 'mongodb://127.0.0.1:27017/triviyaa',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db= mongoose.connection;

module.exports = db;
