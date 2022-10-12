import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
      password
      createdAt
      rooms {
        _id
        roomText
      }
    }
  }
`;

export const ADD_ROOM = gql`
mutation AddRoom($userId: ID!, $roomCode: String!, $roomTitle: String!, $hostName: String!) {
  addRoom(userId: $userId, roomCode: $roomCode, roomTitle: $roomTitle, hostName: $hostName) {
    _id
    roomCode
    roomTitle
    hostName
    createdAt
  }
}
`;

export const ADD_QUESTION = gql`
mutation AddQuestion($roomId: String!, $questionText: String!, $correctAnswerText: String!) {
  addQuestion(roomId: $roomId, questionText: $questionText, correctAnswerText: $correctAnswerText) {
    _id
    questionText
    correctAnswerText
  }
}
`;

export const ADD_ANSWER = gql`
mutation AddAnswer($questionId: ID!, $answerText: String!, $playerId: String!) {
  addAnswer(questionId: $questionId, answerText: $answerText, playerId: $playerId) {
    _id
    answerText
    playerId
  }
}
`;
