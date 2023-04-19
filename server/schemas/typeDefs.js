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
    skills: [Skill]
    website: String
    posts: [Post]
    connections: [User]
    groups: [Group]
    profPic: String
    bannerPic: String
    entitiesFollowed: [Entity]
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
    posts: [Post]
    jobs: [Job]
    admins: [User]
    profPic: String
    bannerPic: String
    entitiesFollowed: [Entity]
  }

  type Job {
    _id: ID!
    company: [Company]
    title: String
    responsibilities: String
    qualifications: String
    schedule: String
    salary: Int
    benefits: String
    skills: [Skill]
    applicants: [User]
  }

  type Post {
    _id: ID!
    user: User
    entity: Entity
    postBody: String
    reactions: [String]
    comments: [String]
  }

  type Comment {
    _id: ID!
    entity: [Entity]
    commentBody: String
    reactions: [String]
  }

  type Group {
    _id: ID!
    name: String
    admins: [User]
    private: Boolean
    members: [User]
    posts: [Post]
    joinQuestion: String
    profilePic: String
    bannerPic: String
  }

  type School {
    _id: ID!
    name: String
    city: String
    state: String
    bio: String
    foundedYear: Int
    studentBody: Int
    website: String
    profPic: String
    bannerPic: String
    posts: [Post]
    entitiesFollowed: [Entity]
    admins: [User]
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

  type Entity {
    _id: ID!
    user: User
    school: School
    company: Company
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    companies: [Company]
    company(companyId: ID!): Company
    jobs: [Job]
    job(jobId: ID!): Job
    posts: [Post]
    post(postId: ID!): Post
    groups: [Group]
    group(groupId: ID!): Group
    schools: [School]
    school(schoolId: ID!): School
    feed(id: ID!): Post
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    updateUser(
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
      profPic: String
      bannerPic: String
      entitiesFollowed: [String]
    ): User
    createSchool(
      name: String!
      city: String!
      state: String!
      bio: String
      foundedYear: Int
      studentBody: Int
      Website: String
      profPic: String
      bannerPic: String
    ): School
    createCompany(
      name: String!
      admins: [String]!
      hqCity: String!
      hqState: String!
      website: String
      bio: String!
      companySize: String
      foundedYear: String
    ): Company
    createGroup(
      name: String!
      admins: [String]!
      private: Boolean!
      members: [String]
      posts: [String]
      joinQuestion: String
      profilePic: String
      bannerPic: String
    ): Group
    createSkill(skillName: String!): Skill
    createJob(
      company: String!
      title: String!
      responsibilities: String!
      qualifications: String!
      schedule: String!
      salary: Int
      benefits: String
      skills: [String]
    ): Job
    createPost(user: String!, entity: String!, postBody: String!): Post
    userLogin(email: String, username: String, password: String!): Auth
  }
`;

module.exports = typeDefs;

// applyToJob
