const { AuthenticationError } = require('apollo-server-express');
const { Question, Room, User, Answer } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    users: async () => {
      return User.find().populate('rooms');
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('rooms');
    },

    rooms: async (parent, { name }) => {
      const params = name ? { name } : {}
      console.log(params);
      return Room.find(params).populate('questions').sort({ createdAt: -1 });
    },
    room: async (parent, { roomCode }) => {
      return Room.findOne({ roomCode: roomCode }).populate('questions');
    },

    questions: async (parent, { name }) => {
      const params = name ? { name } : {}
      console.log(params);
      return Question.find(params).populate('answers').sort({ createdAt: -1 });
    },
    question: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId }).populate('answers');
    },
    // questions: async (parent, { questionText }) => {
    //   const params = questionText ? { questionText } : {}
    //   return Question.find(params).populate('answers').sort({ createdAt: -1 });
    // },
    // question: async (parent, { questionId }) => {
    //   return Question.findOne({ _id: questionId }).populate('answers');
    // },

  },


  Mutation: {

    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },


    addRoom: async (parent, { userId, roomCode, roomTitle, hostName }, context) => {
      // if (context.user) {
      const room = await Room.create({
        roomCode,
        roomTitle,
        hostName,
      });
      console.log(room);
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { rooms: room._id } },
        {
          new: true,
          runValidators: true,
        })
      

      return room;
      // }
      // throw new AuthenticationError('You need to be logged in!');

    },

    updateRoom: async(parent, {_id, hasStarted}) => {
      const room = await Room.findOneAndUpdate(
        { _id: _id },
        { $set: {hasStarted: true}},
        { new: true }
      );
      console.log(room);
      return room;
    },

    addQuestion: async (parent, { roomId, questionText, correctAnswerText }, context) => {
      // if (context.user) {
        const question = await Question.create({
          questionText,
          correctAnswerText,
          });
        
      await Room.findOneAndUpdate(
        { _id: roomId },
        {$addToSet: { questions: question._id}},
        {
          new: true,
          runValidators: true,
        }
      ); return question;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    addAnswer: async (parent, { questionId, answerText, playerId }, context) => {
      // if (context.user) {
      const answer = await Answer.create({
          answerText, playerId,
          });
        await Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {answers: answer._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );return answer;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeRoom: async (parent, { roomId }, context) => {
      if (context.user) {
        const room = await Room.findOneAndDelete({
          _id: roomId,
          roomText,
          roomTitle,
          roomDesc,
          roomOptions,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { rooms: room._id } }
        );

        return room;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeQuestion: async (parent, { roomId, questionId }, context) => {
     // if (context.user) {
        return Room.findOneAndUpdate(
          { _id: roomId },
          {
            $pull: {
              questions: {
                _id: questionId,
              },
            },
          },
          {
            new: true,

          }
        );
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },



    removeAnswer: async (parent, { questionId, answerId }) => {
      return Question.findOneAndUpdate(
        { _id: questionId },
        { $pull: { answers: { _id: answerId } } },
        { new: true }
      );
    },
  },
};


module.exports = resolvers;
