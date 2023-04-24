import { gql } from "@apollo/client";

export {
  CREATE_USER,
  USER_LOGIN,
  CREATE_POST,
  CREATE_COMPANY,
  CREATE_COMMENT,
  CREATE_GROUP,
  CREATE_SCHOOL,
  CREATE_JOB,
  CREATE_SKILL,
  ADD_SKILL,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  CREATE_POST_REACTION,
  CREATE_COMMENT_REACTION,
  CREATE_LOCATION,
  APPLY_TO_JOB,
  FOLLOW_ENTITY,
  ADD_CONNECTION,
  UPDATE_USER_TEST,
  UPDATE_GROUP,
  UPDATE_USER,
  UPDATE_COMPANY,
  UPDATE_SCHOOL,
  UPDATE_JOB,
  UPDATE_LOCATION,
  UPDATE_EDUCATION,
  UPDATE_EXPERIENCE,
  JOIN_GROUP,
  REMOVE_SKILL,
  REMOVE_JOB,
  REMOVE_GROUP,
  REMOVE_USER,
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
  mutation UserLogin($email: String, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
        _id
      }
      entity {
        _id
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
    $website: String!
    $bio: String!
    $companySize: String!
    $foundedYear: Int!
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
      foundedYear: $foundedYear
      specialties: $specialties
    ) {
      _id
      name
      industry
      hqCity
      hqState
      website
      bio
      companySize
      foundedYear
      specialties
    }
  }
`;

const CREATE_LOCATION = gql`
  mutation Mutation(
    $city: String!
    $state: String!
    $size: String
    $phone: String
  ) {
    createLocation(city: $city, state: $state, size: $size, phone: $phone) {
      name
      locations {
        city
        state
        phone
        size
      }
    }
  }
`;

const CREATE_SCHOOL = gql`
  mutation createSchool(
    $name: String!
    $city: String!
    $state: String!
    $bio: String
    $foundedYear: Int
    $studentBody: Int
    $website: String
    $profPic: String
    $bannerPic: String
  ) {
    createSchool(
      name: $name
      city: $city
      state: $state
      bio: $bio
      foundedYear: $foundedYear
      studentBody: $studentBody
      website: $website
      profPic: $profPic
      bannerPic: $bannerPic
    ) {
      _id
      name
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
    $description: String!
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
      description: $description
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
//create skill in skills collection
const CREATE_SKILL = gql`
  mutation CreateSkill($skillName: String!) {
    createSkill(skillName: $skillName) {
      _id
      skillName
    }
  }
`;
// add skill to user
const ADD_SKILL = gql`
  mutation AddSkill($skillName: String!) {
    addSkill(skillName: $skillName) {
      _id
      firstName
      lastName
      skills {
        _id
        skillName
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $commentBody: String!) {
    createComment(postId: $postId, commentBody: $commentBody) {
      _id
      comments {
        commentBody
      }
    }
  }
`;

const CREATE_EXPERIENCE = gql`
  mutation CreateExperience(
    $company: String!
    $title: String!
    $jobDescription: String!
    $skills: [String]
    $startMonth: String!
    $startYear: Int!
    $current: Boolean
    $endMonth: String
    $endYear: Int
  ) {
    createExperience(
      company: $company
      title: $title
      jobDescription: $jobDescription
      skills: $skills
      startMonth: $startMonth
      startYear: $startYear
      current: $current
      endMonth: $endMonth
      endYear: $endYear
    ) {
      _id
      firstName
      lastName
      experience {
        company {
          name
          profPic
        }
        title
        jobDescription
        skills {
          _id
          skillName
        }
        startMonth
        startYear
        current
        endMonth
        endYear
      }
    }
  }
`;

const CREATE_EDUCATION = gql`
  mutation CreateEducation(
    $school: String!
    $fieldOfStudy: String!
    $certificateType: String!
    $startMonth: String!
    $startYear: Int!
    $current: Boolean!
    $skills: [String]
    $endMonth: String
    $endYear: Int
  ) {
    createEducation(
      school: $school
      fieldOfStudy: $fieldOfStudy
      certificateType: $certificateType
      startMonth: $startMonth
      startYear: $startYear
      current: $current
      skills: $skills
      endMonth: $endMonth
      endYear: $endYear
    ) {
      _id
      firstName
      lastName
      education {
        school {
          _id
          name
          profPic
        }
        certificateType
        fieldOfStudy
        startMonth
        startYear
        current
        endMonth
        endYear
        skills {
          _id
          skillName
        }
      }
    }
  }
`;

const CREATE_POST_REACTION = gql`
  mutation CreatePostReaction($postId: String!, $reactionId: String!) {
    createPostReaction(postId: $postId, reactionId: $reactionId) {
      _id
      reactions {
        _id
        reactionId {
          _id
          icon
          reactionName
        }
        entity {
          _id
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
  }
`;

const CREATE_COMMENT_REACTION = gql`
  mutation CreateCommentReaction($commentId: String!, $reactionId: String!) {
    createCommentReaction(commentId: $commentId, reactionId: $reactionId) {
      _id
      reactions {
        reactionId {
          icon
          reactionName
        }
        entity {
          company {
            _id
            name
          }
          school {
            _id
            name
          }
          user {
            _id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const APPLY_TO_JOB = gql`
  mutation ApplyToJob($jobId: ID!) {
    applyToJob(jobId: $jobId) {
      _id
      company {
        name
      }
      title
      applicants {
        _id
        firstName
        lastName
      }
    }
  }
`;

const FOLLOW_ENTITY = gql`
  mutation FollowEntity($companyId: String, $schoolId: String) {
    followEntity(companyId: $companyId, schoolId: $schoolId) {
      company {
        entitiesFollowed {
          _id
          company {
            _id
          }
          school {
            _id
          }
          user {
            _id
          }
        }
      }
      school {
        entitiesFollowed {
          _id
          company {
            _id
          }
          school {
            _id
          }
          user {
            _id
          }
        }
      }
      user {
        entitiesFollowed {
          _id
          company {
            _id
          }
          school {
            _id
          }
          user {
            _id
          }
        }
      }
    }
  }
`;

const ADD_CONNECTION = gql`
  mutation AddConnection($connectionId: String!) {
    addConnection(connectionId: $connectionId) {
      firstName
      lastName
      connections {
        firstName
        lastName
      }
    }
  }
`;
const UPDATE_USER_TEST = gql`
  mutation UpdateUserTest(
    $city: String
    $state: String
    $country: String
    $bio: String
  ) {
    updateUserTest(city: $city, state: $state, country: $country, bio: $bio) {
      _id
    }
  }
`;

// update group

const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $name: String
    $admins: [String]
    $private: Boolean
    $members: [String]
    $posts: [String]
    $joinQuestion: String
    $profPic: String
    $bannerPic: String
  ) {
    updateGroup(
      name: $name
      admins: $admins
      private: $private
      members: $members
      posts: $posts
      joinQuestion: $joinQuestion
      profPic: $profPic
      bannerPic: $bannerPic
    ) {
      _id
      name
      joinQuestion
      bannerPic
      profilePic
      members {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

// update user

const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $city: String
    $state: String
    $country: String
    $bio: String
    $education: [String]
    $experience: [String]
    $skills: [String]
    $website: String
    $posts: [String]
    $connections: [String]
    $groups: [String]
    $profPic: String
    $bannerPic: String
    $entitiesFollowed: [String]
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      city: $city
      state: $state
      country: $country
      bio: $bio
      education: $education
      experience: $experience
      skills: $skills
      website: $website
      posts: $posts
      connections: $connections
      groups: $groups
      profPic: $profPic
      bannerPic: $bannerPic
      entitiesFollowed: $entitiesFollowed
    ) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

// update company

const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $name: String
    $industry: String
    $hqCity: String
    $hqState: String
    $website: String
    $tagline: String
    $bio: String
    $companySize: String
    $foundedYear: Int
    $specialties: String
    $followers: [String]
    $employees: [String]
    $posts: [String]
    $jobs: [String]
    $admins: [String]
    $profPic: String
    $bannerPic: String
    $entitiesFollowed: [String]
  ) {
    updateCompany(
      name: $name
      industry: $industry
      hqCity: $hqCity
      hqState: $hqState
      website: $website
      tagline: $tagline
      bio: $bio
      companySize: $companySize
      foundedYear: $foundedYear
      specialties: $specialties
      followers: $followers
      employees: $employees
      posts: $posts
      jobs: $jobs
      admins: $admins
      profPic: $profPic
      bannerPic: $bannerPic
      entitiesFollowed: $entitiesFollowed
    ) {
      _id
      name
      hqCity
      hqState
      jobs {
        _id
        description
        qualifications
        salary
        title
      }
    }
  }
`;

// update school

const UPDATE_SCHOOL = gql`
  mutation UpdateSchool(
    $name: String
    $city: String
    $state: String
    $bio: String
    $foundedYear: Int
    $studentBody: Int
    $website: String
    $profPic: String
    $bannerPic: String
    $posts: [String]
    $entitiesFollowed: [String]
  ) {
    updateSchool(
      name: $name
      city: $city
      state: $state
      bio: $bio
      foundedYear: $foundedYear
      studentBody: $studentBody
      website: $website
      profPic: $profPic
      bannerPic: $bannerPic
      posts: $posts
      entitiesFollowed: $entitiesFollowed
    ) {
      _id
      city
      bio
      name
      state
      studentBody
    }
  }
`;

// update job

const UPDATE_JOB = gql`
  mutation UpdateJob(
    $company: String
    $title: String
    $responsibilities: String
    $qualifications: String
    $schedule: String
    $salary: String
    $benefits: String
    $applicants: [String]
    $skills: [String]
  ) {
    updateJob(
      company: $company
      title: $title
      responsibilities: $responsibilities
      qualifications: $qualifications
      schedule: $schedule
      salary: $salary
      benefits: $benefits
      applicants: $applicants
      skills: $skills
    ) {
      _id
      description
      qualifications
      responsibilities
      salary
      schedule
      company {
        _id
        name
        hqCity
        hqState
      }
    }
  }
`;

// update location

const UPDATE_LOCATION = gql`
  mutation UpdateLocation(
    $city: String
    $state: String
    $size: String
    $phone: String
  ) {
    updateLocation(city: $city, state: $state, size: $size, phone: $phone) {
      _id
      hqCity
      hqState
      name
    }
  }
`;

// update education

const UPDATE_EDUCATION = gql`
  mutation UpdateLocation(
    $city: String
    $state: String
    $size: String
    $phone: String
  ) {
    updateLocation(city: $city, state: $state, size: $size, phone: $phone) {
      _id
      hqCity
      hqState
      name
    }
  }
`;

// update experience

const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience(
    $company: String
    $title: String
    $jobDescription: String
    $skills: [String]
    $startMonth: String
    $current: Boolean
    $startYear: Int
    $endMonth: String
    $endYear: Int
  ) {
    updateExperience(
      company: $company
      title: $title
      jobDescription: $jobDescription
      skills: $skills
      startMonth: $startMonth
      current: $current
      startYear: $startYear
      endMonth: $endMonth
      endYear: $endYear
    ) {
      _id
      city
      country
      email
      firstName
      lastName
    }
  }
`;

// join group

// const JOIN_GROUP = gql`
//   mutation JoinGroup($groupId: String!) {
//     joinGroup(groupID: $groupId) {
//       _id
//       firstName
//       lastName
//     }
//   }
// `;

// join group

const JOIN_GROUP = gql`
  mutation JoinGroup($groupId: String!) {
    joinGroup(groupID: $groupId) {
      _id
      firstName
      lastName
    }
  }
`;

// remove skill

const REMOVE_SKILL = gql`
  mutation RemoveSkill($skillId: ID!) {
    removeSkill(skillId: $skillId) {
      _id
      skillName
    }
  }
`;

// remove job

const REMOVE_JOB = gql`
  mutation Mutation($jobId: ID!) {
    removeJob(jobId: $jobId) {
      _id
      company {
        _id
        name
      }
      title
    }
  }
`;

// remove group

const REMOVE_GROUP = gql`
  mutation RemoveGroup($groupId: ID!) {
    removeGroup(groupId: $groupId) {
      _id
      name
      members {
        firstName
        lastName
        _id
        posts {
          _id
          postBody
        }
      }
    }
  }
`;
const REMOVE_USER = gql`
  mutation RemoveUser {
    removeUser {
      _id
    }
  }
`;
