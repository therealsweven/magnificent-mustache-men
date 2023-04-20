const { gql } = require("apollo-server-express");

// Queries/typeDefs/Updates for experienceSchema and educationSchema from User.js required?
// ^^^^^^^^what about locationSchema from Company.js
// Updates for all three have been setup in the typeDef mutations
// Do we need ids for each of three schemas listed above in order to update?

const typeDefs = gql`
  type User {
    _id: ID!
    entityId: ID
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
    entityId: ID
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
    description: String
    responsibilities: String
    qualifications: String
    schedule: String
    salary: String
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

  type Location {
    city: String
    state: String
    size: String
    phone: String
  }

  type CommentReaction {
    _id: ID!
    entity: Entity
    reactionId: Reaction
  }

  type PostReaction {
    _id: ID!
    entity: Entity
    reactionId: Reaction
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
    entityId: ID
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
    me: User
    companies: [Company]
    company(companyId: ID!): Company
    jobs: [Job]
    job(jobId: ID!): Job
    feed: [Post]
    profiles: [Entity]
    post(postId: ID!): Post
    groups: [Group]
    group(groupId: ID!): Group
    schools: [School]
    school(schoolId: ID!): School
  }

  type Mutation {
    createLocation(
      city: String!
      state: String!
      size: String
      phone: String
    ): Company
    createEducation(
      school: String!
      fieldOfStudy: String!
      certificateType: String
      skills: [String]
      startMonth: String
      startYear: Int
      current: Boolean
      endMonth: String
      endYear: Int
    ): User
    createExperience(
      company: String!
      title: String!
      jobDescription: String
      skills: [String]
      startMonth: String
      startYear: Int
      current: Boolean
      endMonth: String
      endYear: Int
    ): User
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    updateUser(
      id: ID!
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
    createPostReaction(entity: String!, reactionId: String!): Post
    createComment(entity: String!, commentBody: String!): Post
    createCommentReaction(entity: String!, reactionId: String!): Post

    userLogin(email: String, username: String, password: String!): Auth
    updateCompany(
      id: ID!
      name: String
      industry: String
      hqCity: String
      hqState: String
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
      profPic: String
      bannerPic: String
      entitiesFollowed: [String]
    ): Company
    updateLocation(
      city: String
      state: String
      size: String
      phone: String
    ): Company
    updateSchool(
      id: ID!
      name: String
      city: String
      state: String
      bio: String
      foundedYear: Int
      studentBody: Int
      website: String
      profPic: String
      bannerPic: String
      posts: [String]
      entitiesFollowed: [String]
    ): School
    updatePost(
      id: ID!
      user: String
      entity: String
      postBody: String
      reactions: [String]
      comments: [String]
    ): Post
    updateCommentReaction(entity: String, reactionId: String): Post
    updateComment(
      id: ID!
      entity: String
      commentBody: String
      reactions: [String]
    ): Post
    updatePostReaction(entity: String, reactionId: String): Post
    updateGroup(
      id: ID!
      name: String
      admins: [String]
      private: Boolean
      members: [String]
      posts: [String]
      joinQuestion: String
      profPic: String
      bannerPic: String
    ): Group
    updateJob(
      id: ID!
      company: String
      title: String
      responsibilities: String
      qualifications: String
      schedule: String
      salary: String
      benefits: String
      applicants: [String]
      skills: [String]
    ): Job
    updateExperience(
      company: String
      title: String
      jobDescription: String
      skills: [String]
      startMonth: String
      startYear: Int
      current: Boolean
      endMonth: String
      endYear: Int
    ): User
    updateEducation(
      school: String
      fieldOfStudy: String
      certificateType: String
      skills: [String]
      startMonth: String
      startYear: Int
      current: Boolean
      endMonth: String
      endYear: Int
    ): User
    removeUser: User
    removeGroup: Group
    removeComment(comment: String!): Post
    removePost: Post
    removeCompany: Company
    removeJob: Job
    removeSchool: School
    removeReaction: Reaction
    removeSkill: Skill
    removeEntity: Entity
  }
`;

module.exports = typeDefs;

// applyToJob
