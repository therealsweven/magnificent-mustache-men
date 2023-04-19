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

