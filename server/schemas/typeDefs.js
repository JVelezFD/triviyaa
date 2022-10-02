const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Question {
    _id: ID
    questionText: String
    createdAt: String
    answers: [Answer]!
  }

  type Answer {
    _id: ID
    answerText: String
    createdAt: String
  }

  type Query {
    questions: [Question]!
    question(quesitonId: ID!): Question
  }

  type Mutation {
    addQuestion(questionText: String!): Question
    addAnswer(questionId: ID!, answerText: String!): Question
    removeQuestion(questionId: ID!): Question
    removeAnswer(questionId: ID!, answerId: ID!): Question
  }
`;

module.exports = typeDefs;
