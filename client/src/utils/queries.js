import { gql } from "@apollo/client";

// export const QUERY_USERS = gql`

// `;
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
