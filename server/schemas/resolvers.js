const { Question } = require('../models');

const resolvers = {
  Query: {
    questions: async () => {
      return Question.find();
    },

    question: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId });
    },
  },

  Mutation: {
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
