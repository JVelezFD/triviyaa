const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const questionSchema = new Schema({
  questionText: {
    type: String,
    minlength: 0,
    maxlength: 750,
    trim: true,
  },
  correctAnswerText: {
    type: String,
    minlength: 0,
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
            type: Schema.Types.ObjectId,
            ref: 'Answer'
          },
    ],
},
{
  toJSON: {
    virtuals: true,
    getters: true
  }},

);

questionSchema
.get(function () {
  return `${this.questionText}`;
})



const Question = model('Question', questionSchema);

module.exports = Question;
