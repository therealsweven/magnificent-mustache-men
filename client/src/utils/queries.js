import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      entityId
      firstName
      lastName
      email
      password
      city
      state
      country
      experience
      education
      website
      profPic
      bannerPic
      connections {
        firstName
        lastName
      }
      groups {
        name
      }
      posts {
        postBody
      }
      skills {
        skillName
      }
    }
  }
`;

export const QUERY_PROFILES = gql`
  query Profiles {
    profiles {
      _id
      user {
        firstName
        lastName
        profPic
      }
      school {
        name
        profPic
      }
      company {
        name
        profPic
      }
    }
  }
`;

export const QUERY_JOBS = gql`
  query allJobs {
    jobs {
      _id
      title
      description
      responsibilities
      qualifications
      salary
      benefits
      skills {
        skillName
      }
    }
  }
`;

export const QUERY_FEED = gql`
  query Feed {
    feed {
      _id
      entity {
        _id
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
      postBody
      reactions
    }
  }
`;

export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      city
      state
      country
      website
      email
      education
      experience
      entitiesFollowed {
        _id
        company {
          _id
          name
          profPic
        }
        school {
          _id
          name
          profPic
        }
      }
      skills {
        _id
        skillName
      }
      profPic
      bannerPic
      connections {
        _id
        firstName
        lastName
        profPic
      }
      groups {
        _id
        name
        profilePic
      }
      posts {
        _id
        postBody
        reactions
        comments
      }
    }
  }
`;

export const QUERY_SKILLS = gql`
  query Skills {
    skills {
      _id
      skillName
    }
  }
`;

export const QUERY_COMPANIES = gql`
  query Companies {
    companies {
      bio
      name
      website
      foundedYear
      companySize
      industry
      employees
      hqCity
      hqState
    }
  }
`;

export const QUERY_SINGLE_COMPANY = gql`
  query Query($companyId: ID!) {
    company(companyId: $companyId) {
      bio
      companySize
      hqCity
      hqState
      profPic
      foundedYear
      name
      industry
      website
      bannerPic
    }
  }
`;
