/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const bulkInstallmentPosting = /* GraphQL */ `query BulkInstallmentPosting(
  $adminId: String!
  $agentId: String!
  $agentName: String!
  $agentPhoneNumber: AWSPhone!
  $bulkLoanDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $currentDateTime: AWSDateTime!
  $installmentType: String!
) {
  bulkInstallmentPosting(
    adminId: $adminId
    agentId: $agentId
    agentName: $agentName
    agentPhoneNumber: $agentPhoneNumber
    bulkLoanDetails: $bulkLoanDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    currentDateTime: $currentDateTime
    installmentType: $installmentType
  )
}
` as GeneratedQuery<
  APITypes.BulkInstallmentPostingQueryVariables,
  APITypes.BulkInstallmentPostingQuery
>;
export const byAdminCash = /* GraphQL */ `query ByAdminCash(
  $adminEmailId: ModelStringKeyConditionInput
  $adminID: String!
  $filter: ModelCashAccountFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminCash(
    adminEmailId: $adminEmailId
    adminID: $adminID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      cashflowIn
      cashflowOut
      circleID
      closingBalance
      closingEntryDate
      createdAt
      description
      expireAt
      id
      openingBalance
      openingEntryDate
      outstandingAmount
      simplifiedTransactions
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByAdminCashQueryVariables,
  APITypes.ByAdminCashQuery
>;
export const byAdminCircles = /* GraphQL */ `query ByAdminCircles(
  $adminEmailId: ModelStringKeyConditionInput
  $adminID: ID!
  $filter: ModelCircleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminCircles(
    adminEmailId: $adminEmailId
    adminID: $adminID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByAdminCirclesQueryVariables,
  APITypes.ByAdminCirclesQuery
>;
export const byAdminID = /* GraphQL */ `query ByAdminID(
  $adminEmailId: ModelStringKeyConditionInput
  $adminID: String!
  $filter: ModelIncomeAndExpenseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminID(
    adminEmailId: $adminEmailId
    adminID: $adminID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      amount
      belongsTo
      circleDateOfCreation
      circleID
      createdAt
      date
      description
      expireAt
      id
      incomeOrExpenseType
      initialAmount
      interestRate
      name
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ByAdminIDQueryVariables, APITypes.ByAdminIDQuery>;
export const byAdminMembers = /* GraphQL */ `query ByAdminMembers(
  $adminEmailId: ModelStringKeyConditionInput
  $adminID: String!
  $filter: ModelMemberFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminMembers(
    adminEmailId: $adminEmailId
    adminID: $adminID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      createdAt
      emailId
      expireAt
      id
      lastSeen
      memberRole
      name
      phoneNumber
      profilePicUrl
      share
      status
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByAdminMembersQueryVariables,
  APITypes.ByAdminMembersQuery
>;
export const byAdminTransaction = /* GraphQL */ `query ByAdminTransaction(
  $adminID: String!
  $dateTime: ModelStringKeyConditionInput
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminTransaction(
    adminID: $adminID
    dateTime: $dateTime
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      dateTime
      expireAt
      id
      initialAmount
      transactionType
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByAdminTransactionQueryVariables,
  APITypes.ByAdminTransactionQuery
>;
export const byAdminVehicles = /* GraphQL */ `query ByAdminVehicles(
  $adminEmailId: ModelStringKeyConditionInput
  $adminID: String!
  $filter: ModelVehicleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byAdminVehicles(
    adminEmailId: $adminEmailId
    adminID: $adminID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      createdAt
      expireAt
      id
      updatedAt
      vehicleCapacity
      vehicleColor
      vehicleModel
      vehicleName
      vehicleNumber
      vehiclePicUrl
      vehicleStatus
      vehicleType
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByAdminVehiclesQueryVariables,
  APITypes.ByAdminVehiclesQuery
>;
export const byCircleCash = /* GraphQL */ `query ByCircleCash(
  $circleID: ID!
  $closingEntryDate: ModelStringKeyConditionInput
  $filter: ModelCashAccountFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleCash(
    circleID: $circleID
    closingEntryDate: $closingEntryDate
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      cashflowIn
      cashflowOut
      circleID
      closingBalance
      closingEntryDate
      createdAt
      description
      expireAt
      id
      openingBalance
      openingEntryDate
      outstandingAmount
      simplifiedTransactions
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleCashQueryVariables,
  APITypes.ByCircleCashQuery
>;
export const byCircleCity = /* GraphQL */ `query ByCircleCity(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelCityFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleCity(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleCityQueryVariables,
  APITypes.ByCircleCityQuery
>;
export const byCircleCustomer = /* GraphQL */ `query ByCircleCustomer(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleCustomer(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      cityAdminID
      cityID
      createdAt
      customerStatus
      dateOfCreation
      expireAt
      groupName
      guarantorDetails
      id
      isGroupLoan
      loanSerial
      updatedAt
      visitedOn
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleCustomerQueryVariables,
  APITypes.ByCircleCustomerQuery
>;
export const byCircleID = /* GraphQL */ `query ByCircleID(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: String!
  $filter: ModelIncomeAndExpenseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleID(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      amount
      belongsTo
      circleDateOfCreation
      circleID
      createdAt
      date
      description
      expireAt
      id
      incomeOrExpenseType
      initialAmount
      interestRate
      name
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleIDQueryVariables,
  APITypes.ByCircleIDQuery
>;
export const byCircleLoanSerialNumber = /* GraphQL */ `query ByCircleLoanSerialNumber(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelLoanSerialNumberFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleLoanSerialNumber(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      serialNumber
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleLoanSerialNumberQueryVariables,
  APITypes.ByCircleLoanSerialNumberQuery
>;
export const byCircleMember = /* GraphQL */ `query ByCircleMember(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelCircleMembersFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleMember(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      memberID
      memberId
      memberName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleMemberQueryVariables,
  APITypes.ByCircleMemberQuery
>;
export const byCircleSubscription = /* GraphQL */ `query ByCircleSubscription(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelCMSSubscriptionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleSubscription(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      endDate
      expireAt
      id
      isActive
      paymentMethod
      startDate
      transactionID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleSubscriptionQueryVariables,
  APITypes.ByCircleSubscriptionQuery
>;
export const byCircleTransaction = /* GraphQL */ `query ByCircleTransaction(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleTransaction(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      dateTime
      expireAt
      id
      initialAmount
      transactionType
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleTransactionQueryVariables,
  APITypes.ByCircleTransactionQuery
>;
export const byCircleTransactionDate = /* GraphQL */ `query ByCircleTransactionDate(
  $circleID: ID!
  $dateTime: ModelStringKeyConditionInput
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleTransactionDate(
    circleID: $circleID
    dateTime: $dateTime
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      dateTime
      expireAt
      id
      initialAmount
      transactionType
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleTransactionDateQueryVariables,
  APITypes.ByCircleTransactionDateQuery
>;
export const byCircleVehicle = /* GraphQL */ `query ByCircleVehicle(
  $circleDateOfCreation: ModelStringKeyConditionInput
  $circleID: ID!
  $filter: ModelCircleVehiclesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCircleVehicle(
    circleDateOfCreation: $circleDateOfCreation
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      updatedAt
      vehicleID
      vehicleId
      vehicleNumber
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleVehicleQueryVariables,
  APITypes.ByCircleVehicleQuery
>;
export const byCityCustomer = /* GraphQL */ `query ByCityCustomer(
  $cityAdminID: ModelStringKeyConditionInput
  $cityID: ID!
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCityCustomer(
    cityAdminID: $cityAdminID
    cityID: $cityID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      cityAdminID
      cityID
      createdAt
      customerStatus
      dateOfCreation
      expireAt
      groupName
      guarantorDetails
      id
      isGroupLoan
      loanSerial
      updatedAt
      visitedOn
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCityCustomerQueryVariables,
  APITypes.ByCityCustomerQuery
>;
export const byCustomerLoan = /* GraphQL */ `query ByCustomerLoan(
  $customerAdminID: ModelStringKeyConditionInput
  $customerID: ID!
  $filter: ModelLoanFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byCustomerLoan(
    customerAdminID: $customerAdminID
    customerID: $customerID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      collectibleAmount
      createdAt
      customerAdminID
      customerID
      dateOfCreation
      endDate
      expireAt
      givenAmount
      id
      initialCollectibleAmount
      initialGivenAmount
      installmentAmount
      installmentType
      loanSerial
      nextDueDate
      paidAmount
      paidInstallments
      reasonForLoanTermination
      status
      totalInstallments
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCustomerLoanQueryVariables,
  APITypes.ByCustomerLoanQuery
>;
export const byLoanInstallment = /* GraphQL */ `query ByLoanInstallment(
  $filter: ModelInstallmentFilterInput
  $limit: Int
  $loanAdminID: ModelStringKeyConditionInput
  $loanID: ID!
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byLoanInstallment(
    filter: $filter
    limit: $limit
    loanAdminID: $loanAdminID
    loanID: $loanID
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      city
      createdAt
      customerName
      description
      dueDate
      expireAt
      id
      initialAmount
      installmentAmount
      installmentNumber
      isExtraInstallment
      loanAdminID
      loanID
      loanSerial
      paidAmount
      paidDate
      paymentMethod
      status
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByLoanInstallmentQueryVariables,
  APITypes.ByLoanInstallmentQuery
>;
export const byMemberCircle = /* GraphQL */ `query ByMemberCircle(
  $filter: ModelCircleMembersFilterInput
  $limit: Int
  $memberID: ID!
  $memberName: ModelStringKeyConditionInput
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byMemberCircle(
    filter: $filter
    limit: $limit
    memberID: $memberID
    memberName: $memberName
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      memberID
      memberId
      memberName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByMemberCircleQueryVariables,
  APITypes.ByMemberCircleQuery
>;
export const byMembersID = /* GraphQL */ `query ByMembersID(
  $belongsTo: ID!
  $date: ModelStringKeyConditionInput
  $filter: ModelIncomeAndExpenseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  byMembersID(
    belongsTo: $belongsTo
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      amount
      belongsTo
      circleDateOfCreation
      circleID
      createdAt
      date
      description
      expireAt
      id
      incomeOrExpenseType
      initialAmount
      interestRate
      name
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByMembersIDQueryVariables,
  APITypes.ByMembersIDQuery
>;
export const byVehicleCircle = /* GraphQL */ `query ByVehicleCircle(
  $filter: ModelCircleVehiclesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $vehicleID: ID!
  $vehicleNumber: ModelStringKeyConditionInput
) {
  byVehicleCircle(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    vehicleID: $vehicleID
    vehicleNumber: $vehicleNumber
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      updatedAt
      vehicleID
      vehicleId
      vehicleNumber
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByVehicleCircleQueryVariables,
  APITypes.ByVehicleCircleQuery
>;
export const getAdmin = /* GraphQL */ `query GetAdmin($emailId: AWSEmail!, $id: ID!) {
  getAdmin(emailId: $emailId, id: $id) {
    businessInformation {
      businessAddress
      businessEmail
      businessName
      businessPhoneNumber
      licenseNumber
      profilepPicUrl
      regulatoryBody
      __typename
    }
    cashAccount {
      nextToken
      __typename
    }
    circles {
      nextToken
      __typename
    }
    createdAt
    emailId
    expireAt
    id
    incomeAndExpense {
      nextToken
      __typename
    }
    members {
      nextToken
      __typename
    }
    name
    owner
    phoneNumber
    updatedAt
    vehicles {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAdminQueryVariables, APITypes.GetAdminQuery>;
export const getCMSSubscription = /* GraphQL */ `query GetCMSSubscription($adminID: String!, $id: ID!) {
  getCMSSubscription(adminID: $adminID, id: $id) {
    adminID
    amount
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    createdAt
    endDate
    expireAt
    id
    isActive
    paymentMethod
    startDate
    transactionID
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCMSSubscriptionQueryVariables,
  APITypes.GetCMSSubscriptionQuery
>;
export const getCashAccount = /* GraphQL */ `query GetCashAccount($id: ID!) {
  getCashAccount(id: $id) {
    admin {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    adminEmailId
    adminID
    cashflowIn
    cashflowOut
    circleID
    closingBalance
    closingEntryDate
    closingSnapshot {
      chits
      deficit
      excessCollection
      expenses
      incomes
      interest
      investments
      loansGiven
      repayments
      withdrawals
      __typename
    }
    createdAt
    description
    expireAt
    id
    openingBalance
    openingEntryDate
    outstandingAmount
    simplifiedTransactions
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCashAccountQueryVariables,
  APITypes.GetCashAccountQuery
>;
export const getCircle = /* GraphQL */ `query GetCircle($dateOfCreation: AWSDate!, $id: ID!) {
  getCircle(dateOfCreation: $dateOfCreation, id: $id) {
    admin {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    adminEmailId
    adminID
    circleName
    circlePicUrl
    cities {
      nextToken
      __typename
    }
    createdAt
    customers {
      nextToken
      __typename
    }
    dateOfCreation
    day
    expireAt
    id
    incomeAndExpenses {
      nextToken
      __typename
    }
    isLocked
    loanSerialNumber {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      serialNumber
      updatedAt
      __typename
    }
    members {
      nextToken
      __typename
    }
    subscription {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      endDate
      expireAt
      id
      isActive
      paymentMethod
      startDate
      transactionID
      updatedAt
      __typename
    }
    transactions {
      nextToken
      __typename
    }
    updatedAt
    vehicles {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCircleQueryVariables, APITypes.GetCircleQuery>;
export const getCircleMembers = /* GraphQL */ `query GetCircleMembers($circleId: ID!, $memberId: ID!) {
  getCircleMembers(circleId: $circleId, memberId: $memberId) {
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    circleId
    createdAt
    expireAt
    member {
      adminEmailId
      adminID
      createdAt
      emailId
      expireAt
      id
      lastSeen
      memberRole
      name
      phoneNumber
      profilePicUrl
      share
      status
      updatedAt
      __typename
    }
    memberID
    memberId
    memberName
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCircleMembersQueryVariables,
  APITypes.GetCircleMembersQuery
>;
export const getCircleVehicles = /* GraphQL */ `query GetCircleVehicles($circleId: ID!, $vehicleId: ID!) {
  getCircleVehicles(circleId: $circleId, vehicleId: $vehicleId) {
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    circleId
    createdAt
    expireAt
    updatedAt
    vehicle {
      adminEmailId
      adminID
      createdAt
      expireAt
      id
      updatedAt
      vehicleCapacity
      vehicleColor
      vehicleModel
      vehicleName
      vehicleNumber
      vehiclePicUrl
      vehicleStatus
      vehicleType
      __typename
    }
    vehicleID
    vehicleId
    vehicleNumber
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCircleVehiclesQueryVariables,
  APITypes.GetCircleVehiclesQuery
>;
export const getCity = /* GraphQL */ `query GetCity($adminID: String!, $id: ID!) {
  getCity(adminID: $adminID, id: $id) {
    adminID
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    createdAt
    customers {
      nextToken
      __typename
    }
    expireAt
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCityQueryVariables, APITypes.GetCityQuery>;
export const getCustomer = /* GraphQL */ `query GetCustomer($adminID: String!, $id: ID!) {
  getCustomer(adminID: $adminID, id: $id) {
    adminID
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    city {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      name
      updatedAt
      __typename
    }
    cityAdminID
    cityID
    createdAt
    customerStatus
    customers {
      address
      customerName
      customerPicUrl
      phone
      uId
      __typename
    }
    dateOfCreation
    documents {
      addressProof
      addressProofType
      documentsVerifiedAt
      documentsVerifiedBy
      emptyCheque
      emptyChequeNumber
      idProof
      idProofType
      otherDocuments
      photographSubmitted
      promissoryNote
      promissoryNoteNumber
      remarks
      __typename
    }
    expireAt
    groupName
    guarantorDetails
    id
    installmentPaymentInfo {
      installmentAmount
      installmentID
      loanSerial
      paidAmount
      paidDate
      __typename
    }
    isGroupLoan
    loanSerial
    loans {
      nextToken
      __typename
    }
    location {
      latitude
      longitude
      __typename
    }
    newLoanInfo {
      givenDate
      loanID
      loanSerial
      totalGivenAmount
      __typename
    }
    oldLoanInfo {
      closedDate
      loanID
      loanSerial
      totalCollectedAmount
      __typename
    }
    updatedAt
    visitedOn
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerQueryVariables,
  APITypes.GetCustomerQuery
>;
export const getIncomeAndExpense = /* GraphQL */ `query GetIncomeAndExpense($adminID: String!, $id: ID!) {
  getIncomeAndExpense(adminID: $adminID, id: $id) {
    admin {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    adminEmailId
    adminID
    amount
    belongsTo
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    createdAt
    date
    description
    expireAt
    id
    incomeOrExpenseType
    initialAmount
    interestRate
    name
    updatedAt
    updatedDate
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetIncomeAndExpenseQueryVariables,
  APITypes.GetIncomeAndExpenseQuery
>;
export const getInstallment = /* GraphQL */ `query GetInstallment($adminID: String!, $id: ID!) {
  getInstallment(adminID: $adminID, id: $id) {
    adminID
    circleID
    city
    collectionAgentDetails {
      agentID
      name
      phoneNumber
      __typename
    }
    createdAt
    customerName
    description
    dueDate
    expireAt
    id
    initialAmount
    installmentAmount
    installmentNumber
    isExtraInstallment
    loan {
      adminID
      circleID
      collectibleAmount
      createdAt
      customerAdminID
      customerID
      dateOfCreation
      endDate
      expireAt
      givenAmount
      id
      initialCollectibleAmount
      initialGivenAmount
      installmentAmount
      installmentType
      loanSerial
      nextDueDate
      paidAmount
      paidInstallments
      reasonForLoanTermination
      status
      totalInstallments
      updatedAt
      updatedDate
      __typename
    }
    loanAdminID
    loanID
    loanSerial
    paidAmount
    paidDate
    paymentMethod
    status
    updatedAt
    updatedDate
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetInstallmentQueryVariables,
  APITypes.GetInstallmentQuery
>;
export const getLoan = /* GraphQL */ `query GetLoan($adminID: String!, $id: ID!) {
  getLoan(adminID: $adminID, id: $id) {
    adminID
    circleID
    collectibleAmount
    createdAt
    customer {
      adminID
      circleDateOfCreation
      circleID
      cityAdminID
      cityID
      createdAt
      customerStatus
      dateOfCreation
      expireAt
      groupName
      guarantorDetails
      id
      isGroupLoan
      loanSerial
      updatedAt
      visitedOn
      __typename
    }
    customerAdminID
    customerID
    dateOfCreation
    endDate
    expireAt
    givenAmount
    id
    initialCollectibleAmount
    initialGivenAmount
    installmentAmount
    installmentType
    installments {
      nextToken
      __typename
    }
    loanSerial
    nextDueDate
    paidAmount
    paidInstallments
    reasonForLoanTermination
    status
    totalInstallments
    updatedAt
    updatedDate
    __typename
  }
}
` as GeneratedQuery<APITypes.GetLoanQueryVariables, APITypes.GetLoanQuery>;
export const getLoanSerialNumber = /* GraphQL */ `query GetLoanSerialNumber($adminID: String!, $id: ID!) {
  getLoanSerialNumber(adminID: $adminID, id: $id) {
    adminID
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    createdAt
    expireAt
    id
    serialNumber
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLoanSerialNumberQueryVariables,
  APITypes.GetLoanSerialNumberQuery
>;
export const getMember = /* GraphQL */ `query GetMember($id: ID!, $name: String!) {
  getMember(id: $id, name: $name) {
    admin {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    adminEmailId
    adminID
    circle {
      nextToken
      __typename
    }
    createdAt
    emailId
    expireAt
    id
    lastSeen
    location {
      latitude
      longitude
      __typename
    }
    memberRole
    name
    phoneNumber
    profilePicUrl
    share
    status
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMemberQueryVariables, APITypes.GetMemberQuery>;
export const getTransaction = /* GraphQL */ `query GetTransaction($adminID: String!, $id: ID!) {
  getTransaction(adminID: $adminID, id: $id) {
    additionalInfo {
      city
      customerName
      description
      loanId
      loanSerial
      memberID
      memberName
      oldLoanAmount
      oldLoanSerial
      paymentMethod
      totalOutstandingAmount
      transactionEvent
      __typename
    }
    adminID
    amount
    circle {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    circleDateOfCreation
    circleID
    createdAt
    dateTime
    expireAt
    id
    initialAmount
    transactionType
    updatedAt
    updatedDate
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTransactionQueryVariables,
  APITypes.GetTransactionQuery
>;
export const getVehicle = /* GraphQL */ `query GetVehicle($id: ID!, $vehicleNumber: String!) {
  getVehicle(id: $id, vehicleNumber: $vehicleNumber) {
    admin {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    adminEmailId
    adminID
    circles {
      nextToken
      __typename
    }
    createdAt
    expireAt
    id
    updatedAt
    vehicleCapacity
    vehicleColor
    vehicleModel
    vehicleName
    vehicleNumber
    vehiclePicUrl
    vehicleStatus
    vehicleType
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleQueryVariables,
  APITypes.GetVehicleQuery
>;
export const installmentByCircleAndPaidDate = /* GraphQL */ `query InstallmentByCircleAndPaidDate(
  $circleID: ID!
  $filter: ModelInstallmentFilterInput
  $limit: Int
  $nextToken: String
  $paidDate: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  installmentByCircleAndPaidDate(
    circleID: $circleID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    paidDate: $paidDate
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      city
      createdAt
      customerName
      description
      dueDate
      expireAt
      id
      initialAmount
      installmentAmount
      installmentNumber
      isExtraInstallment
      loanAdminID
      loanID
      loanSerial
      paidAmount
      paidDate
      paymentMethod
      status
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InstallmentByCircleAndPaidDateQueryVariables,
  APITypes.InstallmentByCircleAndPaidDateQuery
>;
export const listAdmins = /* GraphQL */ `query ListAdmins(
  $emailId: ModelStringKeyConditionInput
  $filter: ModelAdminFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAdmins(
    emailId: $emailId
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      emailId
      expireAt
      id
      name
      owner
      phoneNumber
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminsQueryVariables,
  APITypes.ListAdminsQuery
>;
export const listCMSSubscriptions = /* GraphQL */ `query ListCMSSubscriptions(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelCMSSubscriptionFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCMSSubscriptions(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      endDate
      expireAt
      id
      isActive
      paymentMethod
      startDate
      transactionID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCMSSubscriptionsQueryVariables,
  APITypes.ListCMSSubscriptionsQuery
>;
export const listCashAccounts = /* GraphQL */ `query ListCashAccounts(
  $filter: ModelCashAccountFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCashAccounts(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      cashflowIn
      cashflowOut
      circleID
      closingBalance
      closingEntryDate
      createdAt
      description
      expireAt
      id
      openingBalance
      openingEntryDate
      outstandingAmount
      simplifiedTransactions
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCashAccountsQueryVariables,
  APITypes.ListCashAccountsQuery
>;
export const listCircleMembers = /* GraphQL */ `query ListCircleMembers(
  $circleId: ID
  $filter: ModelCircleMembersFilterInput
  $limit: Int
  $memberId: ModelIDKeyConditionInput
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCircleMembers(
    circleId: $circleId
    filter: $filter
    limit: $limit
    memberId: $memberId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      memberID
      memberId
      memberName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCircleMembersQueryVariables,
  APITypes.ListCircleMembersQuery
>;
export const listCircleVehicles = /* GraphQL */ `query ListCircleVehicles(
  $circleId: ID
  $filter: ModelCircleVehiclesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $vehicleId: ModelIDKeyConditionInput
) {
  listCircleVehicles(
    circleId: $circleId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    vehicleId: $vehicleId
  ) {
    items {
      circleDateOfCreation
      circleID
      circleId
      createdAt
      expireAt
      updatedAt
      vehicleID
      vehicleId
      vehicleNumber
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCircleVehiclesQueryVariables,
  APITypes.ListCircleVehiclesQuery
>;
export const listCircles = /* GraphQL */ `query ListCircles(
  $dateOfCreation: ModelStringKeyConditionInput
  $filter: ModelCircleFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCircles(
    dateOfCreation: $dateOfCreation
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      circleName
      circlePicUrl
      createdAt
      dateOfCreation
      day
      expireAt
      id
      isLocked
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCirclesQueryVariables,
  APITypes.ListCirclesQuery
>;
export const listCities = /* GraphQL */ `query ListCities(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelCityFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCities(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCitiesQueryVariables,
  APITypes.ListCitiesQuery
>;
export const listCustomers = /* GraphQL */ `query ListCustomers(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelCustomerFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCustomers(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      cityAdminID
      cityID
      createdAt
      customerStatus
      dateOfCreation
      expireAt
      groupName
      guarantorDetails
      id
      isGroupLoan
      loanSerial
      updatedAt
      visitedOn
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCustomersQueryVariables,
  APITypes.ListCustomersQuery
>;
export const listIncomeAndExpenses = /* GraphQL */ `query ListIncomeAndExpenses(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelIncomeAndExpenseFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listIncomeAndExpenses(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      amount
      belongsTo
      circleDateOfCreation
      circleID
      createdAt
      date
      description
      expireAt
      id
      incomeOrExpenseType
      initialAmount
      interestRate
      name
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIncomeAndExpensesQueryVariables,
  APITypes.ListIncomeAndExpensesQuery
>;
export const listInstallments = /* GraphQL */ `query ListInstallments(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelInstallmentFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listInstallments(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      city
      createdAt
      customerName
      description
      dueDate
      expireAt
      id
      initialAmount
      installmentAmount
      installmentNumber
      isExtraInstallment
      loanAdminID
      loanID
      loanSerial
      paidAmount
      paidDate
      paymentMethod
      status
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstallmentsQueryVariables,
  APITypes.ListInstallmentsQuery
>;
export const listLoanSerialNumbers = /* GraphQL */ `query ListLoanSerialNumbers(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelLoanSerialNumberFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listLoanSerialNumbers(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleDateOfCreation
      circleID
      createdAt
      expireAt
      id
      serialNumber
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLoanSerialNumbersQueryVariables,
  APITypes.ListLoanSerialNumbersQuery
>;
export const listLoans = /* GraphQL */ `query ListLoans(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelLoanFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listLoans(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      collectibleAmount
      createdAt
      customerAdminID
      customerID
      dateOfCreation
      endDate
      expireAt
      givenAmount
      id
      initialCollectibleAmount
      initialGivenAmount
      installmentAmount
      installmentType
      loanSerial
      nextDueDate
      paidAmount
      paidInstallments
      reasonForLoanTermination
      status
      totalInstallments
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListLoansQueryVariables, APITypes.ListLoansQuery>;
export const listMembers = /* GraphQL */ `query ListMembers(
  $filter: ModelMemberFilterInput
  $id: ID
  $limit: Int
  $name: ModelStringKeyConditionInput
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMembers(
    filter: $filter
    id: $id
    limit: $limit
    name: $name
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminEmailId
      adminID
      createdAt
      emailId
      expireAt
      id
      lastSeen
      memberRole
      name
      phoneNumber
      profilePicUrl
      share
      status
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMembersQueryVariables,
  APITypes.ListMembersQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $adminID: ModelStringKeyConditionInput
  $filter: ModelTransactionFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTransactions(
    adminID: $adminID
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      amount
      circleDateOfCreation
      circleID
      createdAt
      dateTime
      expireAt
      id
      initialAmount
      transactionType
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
export const listVehicles = /* GraphQL */ `query ListVehicles(
  $filter: ModelVehicleFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $vehicleNumber: ModelStringKeyConditionInput
) {
  listVehicles(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    vehicleNumber: $vehicleNumber
  ) {
    items {
      adminEmailId
      adminID
      createdAt
      expireAt
      id
      updatedAt
      vehicleCapacity
      vehicleColor
      vehicleModel
      vehicleName
      vehicleNumber
      vehiclePicUrl
      vehicleStatus
      vehicleType
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVehiclesQueryVariables,
  APITypes.ListVehiclesQuery
>;
export const loanByCircleAndDate = /* GraphQL */ `query LoanByCircleAndDate(
  $circleID: ID!
  $dateOfCreation: ModelStringKeyConditionInput
  $filter: ModelLoanFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  loanByCircleAndDate(
    circleID: $circleID
    dateOfCreation: $dateOfCreation
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminID
      circleID
      collectibleAmount
      createdAt
      customerAdminID
      customerID
      dateOfCreation
      endDate
      expireAt
      givenAmount
      id
      initialCollectibleAmount
      initialGivenAmount
      installmentAmount
      installmentType
      loanSerial
      nextDueDate
      paidAmount
      paidInstallments
      reasonForLoanTermination
      status
      totalInstallments
      updatedAt
      updatedDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LoanByCircleAndDateQueryVariables,
  APITypes.LoanByCircleAndDateQuery
>;
export const manageLoanExpiry = /* GraphQL */ `query ManageLoanExpiry(
  $adminId: String!
  $closingLoanSerial: String!
  $closingReason: String!
  $customerId: String!
  $endDate: AWSDate!
  $expireAt: AWSTimestamp!
  $loanId: String!
  $totalCollectedAmount: Int!
  $updatedSerialNumbers: [String]!
) {
  manageLoanExpiry(
    adminId: $adminId
    closingLoanSerial: $closingLoanSerial
    closingReason: $closingReason
    customerId: $customerId
    endDate: $endDate
    expireAt: $expireAt
    loanId: $loanId
    totalCollectedAmount: $totalCollectedAmount
    updatedSerialNumbers: $updatedSerialNumbers
  )
}
` as GeneratedQuery<
  APITypes.ManageLoanExpiryQueryVariables,
  APITypes.ManageLoanExpiryQuery
>;
export const manageSubscription = /* GraphQL */ `query ManageSubscription(
  $adminId: String!
  $amount: Int!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $endDate: AWSDate!
  $isActive: Boolean!
  $paymentMethod: String!
  $startDate: AWSDate!
  $transactionID: String
) {
  manageSubscription(
    adminId: $adminId
    amount: $amount
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    endDate: $endDate
    isActive: $isActive
    paymentMethod: $paymentMethod
    startDate: $startDate
    transactionID: $transactionID
  )
}
` as GeneratedQuery<
  APITypes.ManageSubscriptionQueryVariables,
  APITypes.ManageSubscriptionQuery
>;
