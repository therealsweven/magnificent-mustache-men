const { gql } = require("apollo-server-express");

// go back and look at queries for education and experience - not necessary or is?
// unfollowEntity should reference Entity or User model?
// removeEntity should reference Entity model...?

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
    education: [Education]
    experience: [Experience]
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
    reactions: [PostReaction]
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    entity: [Entity]
    commentBody: String
    reactions: [CommentReaction]
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

  type Experience {
    _id: ID!
    company: Company
    title: String
    jobDescription: String
    skills: [Skill]
    startYear: Int
    startMonth: String
    current: Boolean
    endMonth: String
    endYear: Int
  }

  type Education {
    _id: ID!
    school: School
    fieldOfStudy: String
    certificateType: String
    skills: [Skill]
    startMonth: String
    startYear: Int
    current: Boolean
    endMonth: String
    endYear: Int
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

  type SearchResult {
    jobs: [Job!]!
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
    feedTest(type: String!, entity: ID!): [Post]
    profiles: [Entity]
    profilesByUser(userId: ID!): [Entity]
    post(postId: ID!): Post
    groups: [Group]
    group(groupId: ID!): Group
    schools: [School]
    school(schoolId: ID!): School
    skills: [Skill]
    search(query: String!): SearchResult!
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
      certificateType: String!
      skills: [String]
      startMonth: String!
      startYear: Int!
      current: Boolean!
      endMonth: String
      endYear: Int
    ): User
    createExperience(
      company: String!
      title: String!
      jobDescription: String!
      skills: [String]
      startMonth: String!
      startYear: Int!
      current: Boolean
      endMonth: String
      endYear: Int
    ): User
    createExperienceTest(
      userId: ID!
      company: String!
      title: String!
      jobDescription: String
      skills: [String]
      startMonth: String!
      startYear: Int!
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
      website: String
      profPic: String
      bannerPic: String
    ): School
    createCompany(
      name: String!
      industry: String
      hqCity: String!
      hqState: String!
      website: String!
      bio: String!
      companySize: String!
      foundedYear: Int!
      specialities: String
    ): Company
    addConnection(connectionId: String!): User
    followEntity(entityId: String!): User
    joinGroup(groupID: String!): User
    createGroup(
      name: String!
      private: Boolean!
      posts: [String]
      joinQuestion: String
      profilePic: String
      bannerPic: String
    ): Group
    createSkill(skillName: String!): Skill
    addSkill(skillId: String!): User
    createJob(
      title: String!
      responsibilities: String!
      qualifications: String!
      description: String!
      schedule: String
      salary: Int
      benefits: String
      skills: [String]
    ): Job
    createPost(postBody: String!): Post
    createPostReaction(postId: String!, reactionId: String!): Post
    createComment(postId: String!, commentBody: String!): Post
    createCommentReaction(postId: String!, reactionId: String!): Comment
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
    removeComment(postId: ID!, commentId: ID!): Post
    removeCommentReaction(commentId: ID!, reactionId: ID!): Post
    removePost(postId: ID!): Post
    removeCompany: Company
    removeJob: Job
    removeSchool: School
    removeReaction(reactionId: ID!): Reaction
    removePostReaction(postId: ID!, reactionId: ID!): Post
    removeSkill(skillId: ID!, userId: ID!): Skill
    removeEntity(entityId: ID!): Entity
    removeConnection(connectionId: ID!): User
    unfollowEntity(entityId: ID!, userId: ID!): User
    leaveGroup(userId: ID!, groupId: ID!): Group
  }
`;

module.exports = typeDefs;

// applyToJob
