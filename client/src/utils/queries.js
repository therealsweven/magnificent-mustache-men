import { gql } from "@apollo/client";

// export const QUERY_USERS = gql`

// `;
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
      education
      experience
      website
      profPic
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

const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      id
      title
      description
      imageUrl
      firstname
      lastname
    }
  }
`;
