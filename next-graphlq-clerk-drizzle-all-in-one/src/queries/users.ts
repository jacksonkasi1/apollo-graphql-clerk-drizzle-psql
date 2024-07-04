import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      users {
        id
        name
        email
        profile
        created_at
        updated_at
      }
      totalCount
    }
  }
`;