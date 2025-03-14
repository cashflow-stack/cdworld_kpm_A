/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const addUserToGroup = /* GraphQL */ `mutation AddUserToGroup($groupName: String!, $userId: String!) {
  addUserToGroup(groupName: $groupName, userId: $userId)
}
` as GeneratedMutation<
  APITypes.AddUserToGroupMutationVariables,
  APITypes.AddUserToGroupMutation
>;
export const additionalLoanCreation = /* GraphQL */ `mutation AdditionalLoanCreation(
  $adminId: String!
  $agentDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $dateTime: AWSDateTime!
  $installmentJson: AWSJSON
  $isNewLoan: Boolean!
  $loanSerialNumberJson: AWSJSON!
  $loanTransactionJson: AWSJSON!
  $newLoanJson: AWSJSON!
  $updatedCustomerJson: AWSJSON!
) {
  additionalLoanCreation(
    adminId: $adminId
    agentDetails: $agentDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    dateTime: $dateTime
    installmentJson: $installmentJson
    isNewLoan: $isNewLoan
    loanSerialNumberJson: $loanSerialNumberJson
    loanTransactionJson: $loanTransactionJson
    newLoanJson: $newLoanJson
    updatedCustomerJson: $updatedCustomerJson
  )
}
` as GeneratedMutation<
  APITypes.AdditionalLoanCreationMutationVariables,
  APITypes.AdditionalLoanCreationMutation
>;
export const createAdmin = /* GraphQL */ `mutation CreateAdmin(
  $condition: ModelAdminConditionInput
  $input: CreateAdminInput!
) {
  createAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAdminMutationVariables,
  APITypes.CreateAdminMutation
>;
export const createCMSSubscription = /* GraphQL */ `mutation CreateCMSSubscription(
  $condition: ModelCMSSubscriptionConditionInput
  $input: CreateCMSSubscriptionInput!
) {
  createCMSSubscription(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCMSSubscriptionMutationVariables,
  APITypes.CreateCMSSubscriptionMutation
>;
export const createCashAccount = /* GraphQL */ `mutation CreateCashAccount(
  $condition: ModelCashAccountConditionInput
  $input: CreateCashAccountInput!
) {
  createCashAccount(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCashAccountMutationVariables,
  APITypes.CreateCashAccountMutation
>;
export const createCircle = /* GraphQL */ `mutation CreateCircle(
  $condition: ModelCircleConditionInput
  $input: CreateCircleInput!
) {
  createCircle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCircleMutationVariables,
  APITypes.CreateCircleMutation
>;
export const createCircleMembers = /* GraphQL */ `mutation CreateCircleMembers(
  $condition: ModelCircleMembersConditionInput
  $input: CreateCircleMembersInput!
) {
  createCircleMembers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCircleMembersMutationVariables,
  APITypes.CreateCircleMembersMutation
>;
export const createCircleVehicles = /* GraphQL */ `mutation CreateCircleVehicles(
  $condition: ModelCircleVehiclesConditionInput
  $input: CreateCircleVehiclesInput!
) {
  createCircleVehicles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCircleVehiclesMutationVariables,
  APITypes.CreateCircleVehiclesMutation
>;
export const createCity = /* GraphQL */ `mutation CreateCity(
  $condition: ModelCityConditionInput
  $input: CreateCityInput!
) {
  createCity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCityMutationVariables,
  APITypes.CreateCityMutation
>;
export const createCustomer = /* GraphQL */ `mutation CreateCustomer(
  $condition: ModelCustomerConditionInput
  $input: CreateCustomerInput!
) {
  createCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCustomerMutationVariables,
  APITypes.CreateCustomerMutation
>;
export const createCustomerLoanWithInstallments = /* GraphQL */ `mutation CreateCustomerLoanWithInstallments(
  $adminId: String!
  $agentDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $circleName: String!
  $customerJson: AWSJSON!
  $dateTime: AWSDateTime!
  $installmentsJson: AWSJSON!
  $loanJson: AWSJSON!
) {
  createCustomerLoanWithInstallments(
    adminId: $adminId
    agentDetails: $agentDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    circleName: $circleName
    customerJson: $customerJson
    dateTime: $dateTime
    installmentsJson: $installmentsJson
    loanJson: $loanJson
  )
}
` as GeneratedMutation<
  APITypes.CreateCustomerLoanWithInstallmentsMutationVariables,
  APITypes.CreateCustomerLoanWithInstallmentsMutation
>;
export const createIncomeAndExpense = /* GraphQL */ `mutation CreateIncomeAndExpense(
  $condition: ModelIncomeAndExpenseConditionInput
  $input: CreateIncomeAndExpenseInput!
) {
  createIncomeAndExpense(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateIncomeAndExpenseMutationVariables,
  APITypes.CreateIncomeAndExpenseMutation
>;
export const createInstallment = /* GraphQL */ `mutation CreateInstallment(
  $condition: ModelInstallmentConditionInput
  $input: CreateInstallmentInput!
) {
  createInstallment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateInstallmentMutationVariables,
  APITypes.CreateInstallmentMutation
>;
export const createLoan = /* GraphQL */ `mutation CreateLoan(
  $condition: ModelLoanConditionInput
  $input: CreateLoanInput!
) {
  createLoan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateLoanMutationVariables,
  APITypes.CreateLoanMutation
>;
export const createLoanSerialNumber = /* GraphQL */ `mutation CreateLoanSerialNumber(
  $condition: ModelLoanSerialNumberConditionInput
  $input: CreateLoanSerialNumberInput!
) {
  createLoanSerialNumber(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateLoanSerialNumberMutationVariables,
  APITypes.CreateLoanSerialNumberMutation
>;
export const createMember = /* GraphQL */ `mutation CreateMember(
  $condition: ModelMemberConditionInput
  $input: CreateMemberInput!
) {
  createMember(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMemberMutationVariables,
  APITypes.CreateMemberMutation
>;
export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
  $condition: ModelTransactionConditionInput
  $input: CreateTransactionInput!
) {
  createTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $email: AWSEmail!
  $memberRole: String!
  $name: String!
  $phoneNumber: AWSPhone!
) {
  createUser(
    email: $email
    memberRole: $memberRole
    name: $name
    phoneNumber: $phoneNumber
  )
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const createVehicle = /* GraphQL */ `mutation CreateVehicle(
  $condition: ModelVehicleConditionInput
  $input: CreateVehicleInput!
) {
  createVehicle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleMutationVariables,
  APITypes.CreateVehicleMutation
>;
export const customerLoanCreation = /* GraphQL */ `mutation CustomerLoanCreation(
  $adminId: String!
  $agentDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $customerJson: AWSJSON!
  $dateTime: AWSDateTime!
  $installmentJson: AWSJSON
  $isNewCustomer: Boolean!
  $loanJson: AWSJSON!
  $loanSerialNumberJson: AWSJSON!
  $loanTransactionJson: AWSJSON!
) {
  customerLoanCreation(
    adminId: $adminId
    agentDetails: $agentDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    customerJson: $customerJson
    dateTime: $dateTime
    installmentJson: $installmentJson
    isNewCustomer: $isNewCustomer
    loanJson: $loanJson
    loanSerialNumberJson: $loanSerialNumberJson
    loanTransactionJson: $loanTransactionJson
  )
}
` as GeneratedMutation<
  APITypes.CustomerLoanCreationMutationVariables,
  APITypes.CustomerLoanCreationMutation
>;
export const deleteAdmin = /* GraphQL */ `mutation DeleteAdmin(
  $condition: ModelAdminConditionInput
  $input: DeleteAdminInput!
) {
  deleteAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteAdminMutationVariables,
  APITypes.DeleteAdminMutation
>;
export const deleteCMSSubscription = /* GraphQL */ `mutation DeleteCMSSubscription(
  $condition: ModelCMSSubscriptionConditionInput
  $input: DeleteCMSSubscriptionInput!
) {
  deleteCMSSubscription(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCMSSubscriptionMutationVariables,
  APITypes.DeleteCMSSubscriptionMutation
>;
export const deleteCashAccount = /* GraphQL */ `mutation DeleteCashAccount(
  $condition: ModelCashAccountConditionInput
  $input: DeleteCashAccountInput!
) {
  deleteCashAccount(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCashAccountMutationVariables,
  APITypes.DeleteCashAccountMutation
>;
export const deleteCircle = /* GraphQL */ `mutation DeleteCircle(
  $condition: ModelCircleConditionInput
  $input: DeleteCircleInput!
) {
  deleteCircle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCircleMutationVariables,
  APITypes.DeleteCircleMutation
>;
export const deleteCircleMembers = /* GraphQL */ `mutation DeleteCircleMembers(
  $condition: ModelCircleMembersConditionInput
  $input: DeleteCircleMembersInput!
) {
  deleteCircleMembers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCircleMembersMutationVariables,
  APITypes.DeleteCircleMembersMutation
>;
export const deleteCircleVehicles = /* GraphQL */ `mutation DeleteCircleVehicles(
  $condition: ModelCircleVehiclesConditionInput
  $input: DeleteCircleVehiclesInput!
) {
  deleteCircleVehicles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCircleVehiclesMutationVariables,
  APITypes.DeleteCircleVehiclesMutation
>;
export const deleteCity = /* GraphQL */ `mutation DeleteCity(
  $condition: ModelCityConditionInput
  $input: DeleteCityInput!
) {
  deleteCity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCityMutationVariables,
  APITypes.DeleteCityMutation
>;
export const deleteCustomer = /* GraphQL */ `mutation DeleteCustomer(
  $condition: ModelCustomerConditionInput
  $input: DeleteCustomerInput!
) {
  deleteCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCustomerMutationVariables,
  APITypes.DeleteCustomerMutation
>;
export const deleteIncomeAndExpense = /* GraphQL */ `mutation DeleteIncomeAndExpense(
  $condition: ModelIncomeAndExpenseConditionInput
  $input: DeleteIncomeAndExpenseInput!
) {
  deleteIncomeAndExpense(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteIncomeAndExpenseMutationVariables,
  APITypes.DeleteIncomeAndExpenseMutation
>;
export const deleteInstallment = /* GraphQL */ `mutation DeleteInstallment(
  $condition: ModelInstallmentConditionInput
  $input: DeleteInstallmentInput!
) {
  deleteInstallment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteInstallmentMutationVariables,
  APITypes.DeleteInstallmentMutation
>;
export const deleteLoan = /* GraphQL */ `mutation DeleteLoan(
  $condition: ModelLoanConditionInput
  $input: DeleteLoanInput!
) {
  deleteLoan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteLoanMutationVariables,
  APITypes.DeleteLoanMutation
>;
export const deleteLoanSerialNumber = /* GraphQL */ `mutation DeleteLoanSerialNumber(
  $condition: ModelLoanSerialNumberConditionInput
  $input: DeleteLoanSerialNumberInput!
) {
  deleteLoanSerialNumber(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteLoanSerialNumberMutationVariables,
  APITypes.DeleteLoanSerialNumberMutation
>;
export const deleteMember = /* GraphQL */ `mutation DeleteMember(
  $condition: ModelMemberConditionInput
  $input: DeleteMemberInput!
) {
  deleteMember(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMemberMutationVariables,
  APITypes.DeleteMemberMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
  $condition: ModelTransactionConditionInput
  $input: DeleteTransactionInput!
) {
  deleteTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const deleteVehicle = /* GraphQL */ `mutation DeleteVehicle(
  $condition: ModelVehicleConditionInput
  $input: DeleteVehicleInput!
) {
  deleteVehicle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleMutationVariables,
  APITypes.DeleteVehicleMutation
>;
export const installmentProcessor = /* GraphQL */ `mutation InstallmentProcessor(
  $adminId: String!
  $agentDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $dateTime: AWSDateTime!
  $extraInstallmentJson: AWSJSON
  $extraTransactionJson: AWSJSON
  $installmentJson: AWSJSON!
  $transactionJson: AWSJSON!
  $updatedCustomerJson: AWSJSON!
  $updatedLoanJson: AWSJSON!
) {
  installmentProcessor(
    adminId: $adminId
    agentDetails: $agentDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    dateTime: $dateTime
    extraInstallmentJson: $extraInstallmentJson
    extraTransactionJson: $extraTransactionJson
    installmentJson: $installmentJson
    transactionJson: $transactionJson
    updatedCustomerJson: $updatedCustomerJson
    updatedLoanJson: $updatedLoanJson
  )
}
` as GeneratedMutation<
  APITypes.InstallmentProcessorMutationVariables,
  APITypes.InstallmentProcessorMutation
>;
export const loanRefinance = /* GraphQL */ `mutation LoanRefinance(
  $adminId: String!
  $agentDetails: AWSJSON!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $customerJson: AWSJSON!
  $dateTime: AWSDateTime!
  $installmentJson: AWSJSON!
  $installmentTransactionJson: AWSJSON!
  $loanSerialNumberJson: AWSJSON!
  $loanTransactionJson: AWSJSON!
  $newLoanJson: AWSJSON!
  $oldLoanJson: AWSJSON!
) {
  loanRefinance(
    adminId: $adminId
    agentDetails: $agentDetails
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    customerJson: $customerJson
    dateTime: $dateTime
    installmentJson: $installmentJson
    installmentTransactionJson: $installmentTransactionJson
    loanSerialNumberJson: $loanSerialNumberJson
    loanTransactionJson: $loanTransactionJson
    newLoanJson: $newLoanJson
    oldLoanJson: $oldLoanJson
  )
}
` as GeneratedMutation<
  APITypes.LoanRefinanceMutationVariables,
  APITypes.LoanRefinanceMutation
>;
export const manageLoanTermination = /* GraphQL */ `mutation ManageLoanTermination(
  $adminId: String!
  $agentId: String!
  $agentName: String!
  $agentPhoneNumber: AWSPhone!
  $circleDateofCreation: AWSDate!
  $circleId: String!
  $closingLoanSerial: String!
  $closingReason: String!
  $customerId: String!
  $customerName: String!
  $dateTime: AWSDateTime!
  $endDate: AWSDate!
  $expireAt: AWSTimestamp!
  $givenAmount: Int!
  $installmentAmount: Int!
  $lTPassword: String!
  $loanId: String!
  $loanSerial: String!
  $paidInstallments: Int!
  $totalCollectedAmount: Int!
  $totalOutstandingAmount: Int!
  $updatedSerialNumbers: [String]!
) {
  manageLoanTermination(
    adminId: $adminId
    agentId: $agentId
    agentName: $agentName
    agentPhoneNumber: $agentPhoneNumber
    circleDateofCreation: $circleDateofCreation
    circleId: $circleId
    closingLoanSerial: $closingLoanSerial
    closingReason: $closingReason
    customerId: $customerId
    customerName: $customerName
    dateTime: $dateTime
    endDate: $endDate
    expireAt: $expireAt
    givenAmount: $givenAmount
    installmentAmount: $installmentAmount
    lTPassword: $lTPassword
    loanId: $loanId
    loanSerial: $loanSerial
    paidInstallments: $paidInstallments
    totalCollectedAmount: $totalCollectedAmount
    totalOutstandingAmount: $totalOutstandingAmount
    updatedSerialNumbers: $updatedSerialNumbers
  )
}
` as GeneratedMutation<
  APITypes.ManageLoanTerminationMutationVariables,
  APITypes.ManageLoanTerminationMutation
>;
export const removeInstallment = /* GraphQL */ `mutation RemoveInstallment(
  $adminId: String!
  $customerId: String!
  $installmentDeletionPassword: String!
  $installmentId: String!
  $loanId: String!
  $nextDueDate: AWSDate!
  $paidAmount: Int!
  $paidInstallments: Int!
  $shouldUpdateCustomer: Boolean!
  $status: String!
) {
  removeInstallment(
    adminId: $adminId
    customerId: $customerId
    installmentDeletionPassword: $installmentDeletionPassword
    installmentId: $installmentId
    loanId: $loanId
    nextDueDate: $nextDueDate
    paidAmount: $paidAmount
    paidInstallments: $paidInstallments
    shouldUpdateCustomer: $shouldUpdateCustomer
    status: $status
  )
}
` as GeneratedMutation<
  APITypes.RemoveInstallmentMutationVariables,
  APITypes.RemoveInstallmentMutation
>;
export const removeLoan = /* GraphQL */ `mutation RemoveLoan(
  $adminId: String!
  $circleId: String!
  $customerId: String!
  $dateTime: AWSDateTime!
  $givenAmount: Int!
  $loanDeletionPassword: String!
  $loanId: String!
  $loanSerial: String!
  $memberId: String!
  $memberName: String!
  $outstandingAmount: Int!
  $paidAmount: Int!
) {
  removeLoan(
    adminId: $adminId
    circleId: $circleId
    customerId: $customerId
    dateTime: $dateTime
    givenAmount: $givenAmount
    loanDeletionPassword: $loanDeletionPassword
    loanId: $loanId
    loanSerial: $loanSerial
    memberId: $memberId
    memberName: $memberName
    outstandingAmount: $outstandingAmount
    paidAmount: $paidAmount
  )
}
` as GeneratedMutation<
  APITypes.RemoveLoanMutationVariables,
  APITypes.RemoveLoanMutation
>;
export const removeUserFromGroup = /* GraphQL */ `mutation RemoveUserFromGroup($groupName: String!, $userId: String!) {
  removeUserFromGroup(groupName: $groupName, userId: $userId)
}
` as GeneratedMutation<
  APITypes.RemoveUserFromGroupMutationVariables,
  APITypes.RemoveUserFromGroupMutation
>;
export const setUserPassword = /* GraphQL */ `mutation SetUserPassword($password: String!, $userId: String!) {
  setUserPassword(password: $password, userId: $userId)
}
` as GeneratedMutation<
  APITypes.SetUserPasswordMutationVariables,
  APITypes.SetUserPasswordMutation
>;
export const updateAdmin = /* GraphQL */ `mutation UpdateAdmin(
  $condition: ModelAdminConditionInput
  $input: UpdateAdminInput!
) {
  updateAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAdminMutationVariables,
  APITypes.UpdateAdminMutation
>;
export const updateCMSSubscription = /* GraphQL */ `mutation UpdateCMSSubscription(
  $condition: ModelCMSSubscriptionConditionInput
  $input: UpdateCMSSubscriptionInput!
) {
  updateCMSSubscription(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCMSSubscriptionMutationVariables,
  APITypes.UpdateCMSSubscriptionMutation
>;
export const updateCashAccount = /* GraphQL */ `mutation UpdateCashAccount(
  $condition: ModelCashAccountConditionInput
  $input: UpdateCashAccountInput!
) {
  updateCashAccount(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCashAccountMutationVariables,
  APITypes.UpdateCashAccountMutation
>;
export const updateCircle = /* GraphQL */ `mutation UpdateCircle(
  $condition: ModelCircleConditionInput
  $input: UpdateCircleInput!
) {
  updateCircle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCircleMutationVariables,
  APITypes.UpdateCircleMutation
>;
export const updateCircleMembers = /* GraphQL */ `mutation UpdateCircleMembers(
  $condition: ModelCircleMembersConditionInput
  $input: UpdateCircleMembersInput!
) {
  updateCircleMembers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCircleMembersMutationVariables,
  APITypes.UpdateCircleMembersMutation
>;
export const updateCircleVehicles = /* GraphQL */ `mutation UpdateCircleVehicles(
  $condition: ModelCircleVehiclesConditionInput
  $input: UpdateCircleVehiclesInput!
) {
  updateCircleVehicles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCircleVehiclesMutationVariables,
  APITypes.UpdateCircleVehiclesMutation
>;
export const updateCity = /* GraphQL */ `mutation UpdateCity(
  $condition: ModelCityConditionInput
  $input: UpdateCityInput!
) {
  updateCity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCityMutationVariables,
  APITypes.UpdateCityMutation
>;
export const updateCustomer = /* GraphQL */ `mutation UpdateCustomer(
  $condition: ModelCustomerConditionInput
  $input: UpdateCustomerInput!
) {
  updateCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCustomerMutationVariables,
  APITypes.UpdateCustomerMutation
>;
export const updateIncomeAndExpense = /* GraphQL */ `mutation UpdateIncomeAndExpense(
  $condition: ModelIncomeAndExpenseConditionInput
  $input: UpdateIncomeAndExpenseInput!
) {
  updateIncomeAndExpense(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateIncomeAndExpenseMutationVariables,
  APITypes.UpdateIncomeAndExpenseMutation
>;
export const updateInstallment = /* GraphQL */ `mutation UpdateInstallment(
  $condition: ModelInstallmentConditionInput
  $input: UpdateInstallmentInput!
) {
  updateInstallment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateInstallmentMutationVariables,
  APITypes.UpdateInstallmentMutation
>;
export const updateLoan = /* GraphQL */ `mutation UpdateLoan(
  $condition: ModelLoanConditionInput
  $input: UpdateLoanInput!
) {
  updateLoan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateLoanMutationVariables,
  APITypes.UpdateLoanMutation
>;
export const updateLoanSerialNumber = /* GraphQL */ `mutation UpdateLoanSerialNumber(
  $condition: ModelLoanSerialNumberConditionInput
  $input: UpdateLoanSerialNumberInput!
) {
  updateLoanSerialNumber(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateLoanSerialNumberMutationVariables,
  APITypes.UpdateLoanSerialNumberMutation
>;
export const updateMember = /* GraphQL */ `mutation UpdateMember(
  $condition: ModelMemberConditionInput
  $input: UpdateMemberInput!
) {
  updateMember(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMemberMutationVariables,
  APITypes.UpdateMemberMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
  $condition: ModelTransactionConditionInput
  $input: UpdateTransactionInput!
) {
  updateTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
export const updateVehicle = /* GraphQL */ `mutation UpdateVehicle(
  $condition: ModelVehicleConditionInput
  $input: UpdateVehicleInput!
) {
  updateVehicle(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleMutationVariables,
  APITypes.UpdateVehicleMutation
>;
export const verifyClosingTransaction = /* GraphQL */ `mutation VerifyClosingTransaction(
  $adminEmailId: AWSEmail!
  $adminId: String!
  $businessLoss: Int
  $cashflowIn: Int!
  $cashflowOut: Int!
  $circleId: String!
  $closingBalance: Int!
  $closingEntryDate: AWSDateTime!
  $description: String
  $existingLoanOutstanding: Int
  $interest: Int!
  $loansGiven: Int!
  $openingBalance: Int!
  $openingEntryDate: AWSDateTime!
  $outstandingAmount: Int!
  $repayments: Int!
  $writeOff: Int
) {
  verifyClosingTransaction(
    adminEmailId: $adminEmailId
    adminId: $adminId
    businessLoss: $businessLoss
    cashflowIn: $cashflowIn
    cashflowOut: $cashflowOut
    circleId: $circleId
    closingBalance: $closingBalance
    closingEntryDate: $closingEntryDate
    description: $description
    existingLoanOutstanding: $existingLoanOutstanding
    interest: $interest
    loansGiven: $loansGiven
    openingBalance: $openingBalance
    openingEntryDate: $openingEntryDate
    outstandingAmount: $outstandingAmount
    repayments: $repayments
    writeOff: $writeOff
  )
}
` as GeneratedMutation<
  APITypes.VerifyClosingTransactionMutationVariables,
  APITypes.VerifyClosingTransactionMutation
>;
