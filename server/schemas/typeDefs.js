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
    roomCode: String
    roomTitle: String
    hostName: String
    hasStarted: Boolean
    createdAt: String
    questions: [Question]!
    answers: [Answer]!
  }

  type Question {
    _id: ID
    questionText: String
    correctAnswerText: String,
    createdAt: String
    answers: [Answer]!
  }

  type Answer {
    _id: ID
    answerText: String
    playerId: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    questions: [Question]!
    question(questionId: ID!): Question
    answers: [Answer]!
    answer(answerId: ID!): Answer
    users: [User]!
    user(userId: ID!): User
    rooms: [Room]!
    room(roomCode: String!): Room
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(roomId: String!, questionText: String! correctAnswerText: String!): Question
    addRoom(userId: ID!, roomCode: String!, roomTitle: String!, hostName: String!): Room
    updateRoom(_id: ID!, hasStarted: Boolean!): Room
    addAnswer(questionId: ID!, answerText: String! playerId: String!): Answer
    removeQuestion( roomId: ID! , questionId: ID!): Question
    removeAnswer(questionId: ID!, answerId: ID!): Answer
    removeRoom(roomId: ID!): User 
  }
`;

module.exports = typeDefs;
