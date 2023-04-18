const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    city: String
    state: String
    country: String
    education: [String]
    experience: [String]
    skills: [String]
    website: String
    posts: [String]
    connections: [String]
    groups: [String]
  }

  type Company {
    _id: ID!
    name: String
    industry: String
    hqCity: String
    hqState: String
    locations: [String]
    website: String
    tagline: String
    bio: String
    companySize: String
    foundedYear: Int
    specialties: String
    followers: [String]
    employees: [String]
    posts: [String]
    jobs: [String]
    admins: [String]
  }

  type Job {
    _id: ID!
    company: String
    title: String
    responsibilities: String
    qualifications: String
    schedule: String
    salary: Int
    benefits: String
    applicants: [String]
  }

  type Post {
    _id: ID!
    user: String
    postBody: String
    reactions: [String]
    comments: [String]
  }

  type Comment {
    _id: ID!
    post: String
    user: String
    commentBody: String
    reactions: [String]
  }

  type Group {
    _id: ID!
    name: String
    prive: Boolean
    members: [String]
    posts: [String]
  }

  type EducationalInstitution {
    _id: ID!
    name: String
    city: String
    state: String
    bio: String
    foundedYear: Int
    studentBody: Int
    website: String
  }

  type Reaction {
    _id: ID!
    reactionName: String
    icon: String
  }

  type Skill {
    _id: ID!
    skillName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
  }
`;

module.exports = typeDefs;
