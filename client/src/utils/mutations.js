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
  mutation addRoom($roomId: ID!, $roomText: String!, $roomTitle: String!, $roomDesc: String!, $roomOptions: String!) {
    addRoom(roomId: $roomId, roomText: $roomText, roomTitle: $roomTitle, roomDesc: $roomDesc, roomOptions: $roomOptions) {
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
