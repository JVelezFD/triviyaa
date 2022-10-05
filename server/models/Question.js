const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const questionSchema = new Schema({
  questionText: {
    type: String,
    required: 'Question Needs to be created',
    minlength: 1,
    maxlength: 750,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
      answers:[
      {
        answerText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 500,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
});




const Question = model('Question', questionSchema);

module.exports = Question;
