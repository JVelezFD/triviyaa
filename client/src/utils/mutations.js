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
mutation addRoom($userId: ID!, $roomText: String!, $roomTitle: String!, $roomDesc: String!, $roomOptions: String!) {
  addRoom(userId: $userId, roomText: $roomText, roomTitle: $roomTitle, roomDesc: $roomDesc, roomOptions: $roomOptions) {
    _id
    roomText
    roomTitle
    roomDesc
    roomOptions
    createdAt
  }
}
`;
