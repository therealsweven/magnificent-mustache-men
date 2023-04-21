import { gql } from "@apollo/client";

export {
  CREATE_USER,
  USER_LOGIN,
  CREATE_POST,
  CREATE_COMPANY,
  CREATE_COMMENT,
  CREATE_GROUP,
  CREATE_SCHOOL,
};

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

const CREATE_SCHOOL = gql`
  mutation CreateSchool($name: String!, $city: String!, $state: String!) {
    createSchool(name: $name, city: $city, state: $state) {
      _id
      name
      city
      state
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

const CREATE_JOB = gql`
  mutation CreateJob(
    $title: String!
    $responsibilities: String!
    $qualifications: String!
    $schedule: String
    $salary: Int
    $benefits: String
    $skills: [String]
  ) {
    createJob(
      title: $title
      responsibilities: $responsibilities
      qualifications: $qualifications
      schedule: $schedule
      salary: $salary
      benefits: $benefits
      skills: $skills
    ) {
      _id
      company {
        _id
        name
      }
      title
    }
  }
`;

const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $private: Boolean!) {
    createGroup(name: $name, private: $private) {
      _id
      name
      private
    }
  }
`;

// const CREATE_SKILL = gql``;

// const ADD_SKILL = gql``;

// const CREATE_POST_REACTION = gql``;

const CREATE_COMMENT = gql`
  mutation Mutation($postId: String!, $commentBody: String!) {
    createComment(postId: $postId, commentBody: $commentBody) {
      _id
      comments
      postBody
      reactions
      user {
        _id
      }
      entity {
        _id
      }
    }
  }
`;
