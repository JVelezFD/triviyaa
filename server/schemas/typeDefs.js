const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
  _id: ID
  name: String
  email: String
  password: String
  rooms: [Room]!
  questions: [Question]!
  answers: [Answer]!
}

 type Room {
    _id: ID
    roomText: String
    roomTitle: String
    roomDesc: String
    roomOptions: String
    createdAt: String
    questions: [Question]!
    answers: [Answer]!
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
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    questions: [Question]!
    question(quesitonId: ID!): Question
    answers: [Answer]!
    answer(answerId: ID!): Answer
    users: [User]!
    user(userId: ID!): User
    rooms: [Room]!
    room(roomId: ID!): Room
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(roomId: String!, questionText: String!): Question
    addRoom(userId: ID!, roomText: String!, roomTitle: String!, roomDesc: String!, roomOptions: String!): Room
    addAnswer(questionId: ID!, answerText: String!): Answer
    removeQuestion( roomId: ID! , questionId: ID!): Question
    removeAnswer(questionId: ID!, answerId: ID!): Answer
    removeRoom(roomId: ID!): User 
  }
`;

module.exports = typeDefs;
