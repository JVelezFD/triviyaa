import { gql } from '@apollo/client';

export const QUERY_ROOMS = gql`
  query Rooms{
  rooms {
    _id
    roomCode
    roomTitle
    hostName
    createdAt
  }
}
`;

export const QUERY_SINGLE_ROOM = gql`
  query Room($roomCode: String!) {
  room(roomCode: $roomCode) {
    _id
    roomCode
    roomTitle
    hostName
    createdAt
    questions {
      _id
      questionText
    }
  }
}
`;

export const QUERY_SINGLE_QUESTION = gql`
query Question($questionId: ID!) {
  question(questionId: $questionId) {
    _id
    questionText
    correctAnswerText
    answers {
      _id
      answerText
      playerId
    }
  }
}
`;