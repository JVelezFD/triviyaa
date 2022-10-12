const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const answerSchema = new Schema({
  answerText: {
    type: String,
    minlength: 0,
    maxlength: 750,
    trim: true,
    allowNull: true,
  },
  playerId: {
    type: String,
    minlength: 0,
    maxlength: 750,
    trim: true,
    allowNull: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
    
},
{
  toJSON: {
    virtuals: true,
    getters: true
  }},
);




const Answer = model('Answer', answerSchema);

module.exports = Answer;
