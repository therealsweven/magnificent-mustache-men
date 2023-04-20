import { gql } from "@apollo/client";

export { CREATE_USER, USER_LOGIN, CREATE_POST, CREATE_COMPANY };

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
  }
`;

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
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

const CREATE_POST = gql`
  mutation createPost($postBody: String!) {
    createPost(postBody: $postBody) {
      _id
      postBody
      entity {
        company {
          name
        }
        school {
          name
        }
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

const CREATE_COMPANY = gql`
  mutation createCompany(
    $name: String!
    $industry: String!
    $hqCity: String!
    $hqState: String!
    $website: String
    $bio: String!
    $companySize: Number!
    $foundedYear: Number
    $specialties: String
  ) {
    createCompany(
      name: $name
      industry: $industry
      hqCity: $hqCity
      hqState: $hqState
      website: $website
      bio: $bio
      companySize: $companySize
      foundedYear: $foundedyear
      specialties: $specialties
    ) {
      _id
      name
      industry
      hqCity
      hqState
      website
      tagline
      bio
      companySize
      foundedYear
      specialties
    }
  }
`;

const CREATE_SCHOOL = gql``;

const CREATE_JOB = gql``;

const CREATE_GROUP = gql``;

const CREATE_SKILL = gql``;
