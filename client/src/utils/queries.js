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
      education {
        school {
          _id
          name
        }
        fieldOfStudy
        certificateType
        skills {
          skillName
          _id
        }
        startMonth
        startYear
        current
        endMonth
        endYear
      }
      experience {
        company {
          name
          _id
        }
        title
        jobDescription
        skills {
          _id
          skillName
        }
        startYear
        startMonth
        current
        endMonth
        endYear
      }
      skills {
        _id
        skillName
      }
      website
      posts {
        _id
        user {
          firstName
          lastName
          _id
        }
        reactions {
          _id
          reactionId {
            reactionName
            _id
            icon
          }
        }
        comments {
          _id
          commentBody
          reactions {
            _id
            reactionId {
              icon
              _id
              reactionName
            }
          }
        }
        postBody
      }
      connections {
        _id
        firstName
        lastName
      }
      groups {
        _id
        name
        private
        joinQuestion
        profilePic
        bannerPic
      }
      profPic
      bannerPic
      entitiesFollowed {
        _id
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
      postBody
      entity {
        _id
        user {
          _id
          firstName
          lastName
          profPic
        }
      }
      comments {
        _id
        commentBody
      }
      createdAt
      updatedAt
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
        prof
        Pic
      }
      posts {
        _id
        postBody
      }
      experience {
        endMonth
        current
        endYear
        jobDescription
        startMonth
        startYear
        title
        skills {
          _id
          skillName
        }
        company {
          name
        }
      }
      education {
        school {
          name
        }
        fieldOfStudy
        certificateType
        startMonth
        startYear
        current
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
      _id
      bio
      name
      website
      foundedYear
      companySize
      industry
      hqCity
      hqState
      profPic
    }
  }
`;

export const QUERY_SINGLE_COMPANY = gql`
  query Query($companyId: ID!) {
    company(companyId: $companyId) {
      _id
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

export const SEARCH_QUERY = gql`
  query Query($query: String!) {
    search(query: $query) {
      jobs {
        title
      }
    }
  }
`;

export const QUERY_SCHOOL = gql`
  query Schools {
    schools {
      _id
      name
    }
  }
`;
export const QUERY_ALL_USERS = gql`
  query Query {
    users {
      firstName
      lastName
      _id
      profPic
    }
  }
`;
export const QUERY_REACTIONS = gql`
  query Reactions {
    reactions {
      _id
      icon
      reactionName
    }
  }
`;

export const QUERY_ALL_GROUPS = gql`
  query Query {
    groups {
      _id
      profilePic
      name
    }
  }
`;

export const QUERY_SINGLE_GROUP = gql`
  query Query($groupId: ID!) {
    group(groupId: $groupId) {
      name
      _id
      profPic
      bannerPic
      admins {
        firstName
        lastName
        profPic
        _id
      }
      members {
        firstName
        lastName
        profPic
        _id
      }
      posts {
        _id
        postBody
        updatedAt
        reactions {
          _id
          reactionId {
            _id
            icon
            reactionName
          }
        }
      }
      private
    }
  }
`;
