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
  query Room($roomId: ID!) {
  room(roomId: $roomId) {
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
