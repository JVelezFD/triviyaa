const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Users {
  _id: ID
  name: String
  email: String
  password: String
  rooms: [Room]!
}

 type Room {
    _id: ID
    roomText: String
    roomTitle: String
    roomDesc: String
    roomOptions: String
    createdAt: String
    questions: [Question]!
  }

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
    questions: [Question]
    question(quesitonText: String!): Question
    answers(questionText: String): [Answer]
    answers(answerId: ID!): Answer
  }

  type Query {
    users: [Users]
    users(name: String!): Users
    rooms(name: String): [Room]
    rooms(roomId: ID!): Room
    me: Users
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(questionText: String!): Question
    addRoom(usersId: ID!, roomText: String!): Users
    addAnswer(questionId: ID!, answerText: String!): Question
    removeQuestion(questionId: ID!): Question
    removeAnswer(questionId: ID!, answerId: ID!): Question
  }
`;

module.exports = typeDefs;
