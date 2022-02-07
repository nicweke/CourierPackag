export const createPackage = /* GraphQL */ `
  mutation CreatePackage(
    $input: CreatePackageInput!
    $condition: ModelPackageConditionInput
  ) {
    createPackage(input: $input, condition: $condition) {
      id
      type
      latitude
      longitude
      heading
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const updatePackage = /* GraphQL */ `
  mutation UpdatePackage(
    $input: UpdatePackageInput!
    $condition: ModelPackageConditionInput
  ) {
    updatePackage(input: $input, condition: $condition) {
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
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      createdAt
      type
      originLatitude
      originLongitude
      destinationLatitude
      destinationLongitude
      status
      userId
      packageId
      updatedAt
      user {
        id
        username
      }
    }
  }
`;