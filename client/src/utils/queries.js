import { gql } from '@apollo/client';

export const QUERY_SINGLE_ROOM = gql`
  query getSingleRoom($roomId: ID!) {
    room(roomId: $roomId) {
      _id
      roomText
      roomTitle
      roomDesc
      roomOptions
      createdAt
      questions {
        _id
        questionText
      }
    }
  }
`;
