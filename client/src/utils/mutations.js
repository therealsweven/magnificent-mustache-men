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
  mutation AddSkill($skillId: String!) {
    addSkill(skillId: $skillId) {
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

const CREATE_EXPERIENCE = gql`
  mutation CreateExperience(
    $company: String!
    $title: String!
    $jobDescription: String
    $skills: [String]
    $startMonth: String
    $startYear: Int
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
  mutation CreateCommentReaction($postId: String!, $reactionId: String!) {
    createCommentReaction(postId: $postId, reactionId: $reactionId) {
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
