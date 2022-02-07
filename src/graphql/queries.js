export const getPackageId = /* GraphQL */ `
  query GetPackage($id: ID!) {
    getPackage(id: $id) {
      id
      
    }
  }
`;
export const getPackage = /* GraphQL */ `
  query GetPackage($id: ID!) {
    getPackage(id: $id) {
      id
      type
      latitude
      longitude
      heading
      isActive
      userId
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $id: ID
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        type
        originLatitude
        originLongitude
        destinationLatitude
        destinationLongitude
        status
        userId
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
        packageId
        package {
          id
          type
          latitude
          longitude
          heading
          isActive
          userId
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;