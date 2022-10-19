require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://triviyaa:YahooThe3estEmail@cluster0.ewe2sqe.mongodb.net/triviyaaDB?retryWrites=true&w=majority", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
