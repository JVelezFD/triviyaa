const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const roomSchema = new Schema({
  roomText: {
    type: String,
    required: 'Question Needs to be created',
    minlength: 1,
    maxlength: 750,
    trim: true,
  },
  roomTitle: {
    type: String,
    allowNull: false
  },
  roomDesc: {
    type: String,
    allowNull: false
  },
  roomOptions: {
    type: String,
    allowNull: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
  ],
     
});




const Room = model('room', roomSchema);

module.exports = Room;