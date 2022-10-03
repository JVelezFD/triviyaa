require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.ATLAS_URL,
  // || 'mongodb://127.0.0.1:27017/triviyaa',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
