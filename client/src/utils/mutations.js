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
