import { gql } from "@apollo/client";

export { CREATE_USER,}

const CREATE_USER = gql`
mutation createUser(
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
) {
  createUser(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    _id
    firstName
    lastName
    email
  }
}`;

export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;