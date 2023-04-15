const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs;
