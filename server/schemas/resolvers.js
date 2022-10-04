const { Question, Room, Users } = require('../models');

const resolvers = {
  Query: {
    questions: async () => {
      return Question.find();
    },
    rooms: async () => {
      return Room.find();
    },
    users: async () => {
      return Users.find();
    },

    question: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId });
    },
    room: async (parent, { questionId }) => {
      return Room.findOne({ _id: roomId });
    },
    user: async (parent, { questionId }) => {
      return Users.findOne({ _id: usersId });
    },
  },

  Mutation: {

    addUser: async (parent, { name, email, password }) => {
      const user = await Users.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError('No user found with this email address');
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect credentials');
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },

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
};

module.exports = resolvers;
