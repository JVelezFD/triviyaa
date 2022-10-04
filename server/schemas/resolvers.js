const { AuthenticationError } = require('apollo-server-express');
const { Question, Room, Users } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {  
    
    users: async () => {
      return Users.find().populate('rooms');
    },

    user: async (parent, {name }) => {
    return Users.findOne({ name }).populate('rooms');
    },
    
    rooms: async (parent, { name }) => {
      const params = name ? { name }: {}
      return Room.find(params).populate('questions').sort({createdAt: -1 });
    },
    room: async (parent, { roomId }) => {
      return Room.findOne({_id: roomId}).populate('questions');
    },

    questions: async (parent, { roomTitle }) => {
      const params = roomTitle ? { roomTitle } : {}
      return Question.find(params).populate('answers').sort({createdAt: -1});
    },
    question: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId }).populate('answers');
    },
  
  
  Mutation: {

    addUser: async (parent, { name, email, password }) => {
      const user = await Users.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });

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

    addRoom: async (parent, { questionText }, context) => {
      if (context.user) {
        const room = await Room.create({
          roomText,
          roomTitle, 
          roomDesc,
          roomOptions,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { questions: question._id } }
        );

        return question;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addQuestion: async (parent, { questionText }) => {
      return Question.create({ questionText,  });
    },
    addQuestion: async (parent, { questionText }) => {
      return Question.create({ questionText,  });
    },
    addAnswer: async (parent, { questionId, questionText }) => {
      return Question.findOneAndUpdate(
        { _id: questionId },
        {
          $addToSet: { anwers: { answerText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeQuestion: async (parent, { questionId }) => {
      return Question.findOneAndDelete({ _id: questionId });
    },
    removeAnswer: async (parent, { questionId, answerId }) => {
      return Question.findOneAndUpdate(
        { _id: questionId },
        { $pull: { answers: { _id: answerId } } },
        { new: true }
      );
    },
  },
},
};

module.exports = resolvers;
