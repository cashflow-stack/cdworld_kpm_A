/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAdmin = /* GraphQL */ `subscription OnCreateAdmin(
  $filter: ModelSubscriptionAdminFilterInput
  $owner: String
) {
  onCreateAdmin(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdminSubscriptionVariables,
  APITypes.OnCreateAdminSubscription
>;
export const onCreateCMSSubscription = /* GraphQL */ `subscription OnCreateCMSSubscription(
  $filter: ModelSubscriptionCMSSubscriptionFilterInput
) {
  onCreateCMSSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCMSSubscriptionSubscriptionVariables,
  APITypes.OnCreateCMSSubscriptionSubscription
>;
export const onCreateCashAccount = /* GraphQL */ `subscription OnCreateCashAccount(
  $filter: ModelSubscriptionCashAccountFilterInput
) {
  onCreateCashAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCashAccountSubscriptionVariables,
  APITypes.OnCreateCashAccountSubscription
>;
export const onCreateCircle = /* GraphQL */ `subscription OnCreateCircle($filter: ModelSubscriptionCircleFilterInput) {
  onCreateCircle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCircleSubscriptionVariables,
  APITypes.OnCreateCircleSubscription
>;
export const onCreateCircleMembers = /* GraphQL */ `subscription OnCreateCircleMembers(
  $filter: ModelSubscriptionCircleMembersFilterInput
) {
  onCreateCircleMembers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCircleMembersSubscriptionVariables,
  APITypes.OnCreateCircleMembersSubscription
>;
export const onCreateCircleVehicles = /* GraphQL */ `subscription OnCreateCircleVehicles(
  $filter: ModelSubscriptionCircleVehiclesFilterInput
) {
  onCreateCircleVehicles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCircleVehiclesSubscriptionVariables,
  APITypes.OnCreateCircleVehiclesSubscription
>;
export const onCreateCity = /* GraphQL */ `subscription OnCreateCity($filter: ModelSubscriptionCityFilterInput) {
  onCreateCity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCitySubscriptionVariables,
  APITypes.OnCreateCitySubscription
>;
export const onCreateCustomer = /* GraphQL */ `subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onCreateCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCustomerSubscriptionVariables,
  APITypes.OnCreateCustomerSubscription
>;
export const onCreateIncomeAndExpense = /* GraphQL */ `subscription OnCreateIncomeAndExpense(
  $filter: ModelSubscriptionIncomeAndExpenseFilterInput
) {
  onCreateIncomeAndExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateIncomeAndExpenseSubscriptionVariables,
  APITypes.OnCreateIncomeAndExpenseSubscription
>;
export const onCreateInstallment = /* GraphQL */ `subscription OnCreateInstallment(
  $filter: ModelSubscriptionInstallmentFilterInput
) {
  onCreateInstallment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstallmentSubscriptionVariables,
  APITypes.OnCreateInstallmentSubscription
>;
export const onCreateLoan = /* GraphQL */ `subscription OnCreateLoan($filter: ModelSubscriptionLoanFilterInput) {
  onCreateLoan(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLoanSubscriptionVariables,
  APITypes.OnCreateLoanSubscription
>;
export const onCreateLoanSerialNumber = /* GraphQL */ `subscription OnCreateLoanSerialNumber(
  $filter: ModelSubscriptionLoanSerialNumberFilterInput
) {
  onCreateLoanSerialNumber(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLoanSerialNumberSubscriptionVariables,
  APITypes.OnCreateLoanSerialNumberSubscription
>;
export const onCreateMember = /* GraphQL */ `subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
  onCreateMember(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMemberSubscriptionVariables,
  APITypes.OnCreateMemberSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onCreateTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onCreateVehicle = /* GraphQL */ `subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onCreateVehicle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVehicleSubscriptionVariables,
  APITypes.OnCreateVehicleSubscription
>;
export const onDeleteAdmin = /* GraphQL */ `subscription OnDeleteAdmin(
  $filter: ModelSubscriptionAdminFilterInput
  $owner: String
) {
  onDeleteAdmin(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdminSubscriptionVariables,
  APITypes.OnDeleteAdminSubscription
>;
export const onDeleteCMSSubscription = /* GraphQL */ `subscription OnDeleteCMSSubscription(
  $filter: ModelSubscriptionCMSSubscriptionFilterInput
) {
  onDeleteCMSSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCMSSubscriptionSubscriptionVariables,
  APITypes.OnDeleteCMSSubscriptionSubscription
>;
export const onDeleteCashAccount = /* GraphQL */ `subscription OnDeleteCashAccount(
  $filter: ModelSubscriptionCashAccountFilterInput
) {
  onDeleteCashAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCashAccountSubscriptionVariables,
  APITypes.OnDeleteCashAccountSubscription
>;
export const onDeleteCircle = /* GraphQL */ `subscription OnDeleteCircle($filter: ModelSubscriptionCircleFilterInput) {
  onDeleteCircle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCircleSubscriptionVariables,
  APITypes.OnDeleteCircleSubscription
>;
export const onDeleteCircleMembers = /* GraphQL */ `subscription OnDeleteCircleMembers(
  $filter: ModelSubscriptionCircleMembersFilterInput
) {
  onDeleteCircleMembers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCircleMembersSubscriptionVariables,
  APITypes.OnDeleteCircleMembersSubscription
>;
export const onDeleteCircleVehicles = /* GraphQL */ `subscription OnDeleteCircleVehicles(
  $filter: ModelSubscriptionCircleVehiclesFilterInput
) {
  onDeleteCircleVehicles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCircleVehiclesSubscriptionVariables,
  APITypes.OnDeleteCircleVehiclesSubscription
>;
export const onDeleteCity = /* GraphQL */ `subscription OnDeleteCity($filter: ModelSubscriptionCityFilterInput) {
  onDeleteCity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCitySubscriptionVariables,
  APITypes.OnDeleteCitySubscription
>;
export const onDeleteCustomer = /* GraphQL */ `subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onDeleteCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCustomerSubscriptionVariables,
  APITypes.OnDeleteCustomerSubscription
>;
export const onDeleteIncomeAndExpense = /* GraphQL */ `subscription OnDeleteIncomeAndExpense(
  $filter: ModelSubscriptionIncomeAndExpenseFilterInput
) {
  onDeleteIncomeAndExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteIncomeAndExpenseSubscriptionVariables,
  APITypes.OnDeleteIncomeAndExpenseSubscription
>;
export const onDeleteInstallment = /* GraphQL */ `subscription OnDeleteInstallment(
  $filter: ModelSubscriptionInstallmentFilterInput
) {
  onDeleteInstallment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstallmentSubscriptionVariables,
  APITypes.OnDeleteInstallmentSubscription
>;
export const onDeleteLoan = /* GraphQL */ `subscription OnDeleteLoan($filter: ModelSubscriptionLoanFilterInput) {
  onDeleteLoan(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLoanSubscriptionVariables,
  APITypes.OnDeleteLoanSubscription
>;
export const onDeleteLoanSerialNumber = /* GraphQL */ `subscription OnDeleteLoanSerialNumber(
  $filter: ModelSubscriptionLoanSerialNumberFilterInput
) {
  onDeleteLoanSerialNumber(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLoanSerialNumberSubscriptionVariables,
  APITypes.OnDeleteLoanSerialNumberSubscription
>;
export const onDeleteMember = /* GraphQL */ `subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
  onDeleteMember(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMemberSubscriptionVariables,
  APITypes.OnDeleteMemberSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onDeleteTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
export const onDeleteVehicle = /* GraphQL */ `subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onDeleteVehicle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVehicleSubscriptionVariables,
  APITypes.OnDeleteVehicleSubscription
>;
export const onUpdateAdmin = /* GraphQL */ `subscription OnUpdateAdmin(
  $filter: ModelSubscriptionAdminFilterInput
  $owner: String
) {
  onUpdateAdmin(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdminSubscriptionVariables,
  APITypes.OnUpdateAdminSubscription
>;
export const onUpdateCMSSubscription = /* GraphQL */ `subscription OnUpdateCMSSubscription(
  $filter: ModelSubscriptionCMSSubscriptionFilterInput
) {
  onUpdateCMSSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCMSSubscriptionSubscriptionVariables,
  APITypes.OnUpdateCMSSubscriptionSubscription
>;
export const onUpdateCashAccount = /* GraphQL */ `subscription OnUpdateCashAccount(
  $filter: ModelSubscriptionCashAccountFilterInput
) {
  onUpdateCashAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCashAccountSubscriptionVariables,
  APITypes.OnUpdateCashAccountSubscription
>;
export const onUpdateCircle = /* GraphQL */ `subscription OnUpdateCircle($filter: ModelSubscriptionCircleFilterInput) {
  onUpdateCircle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCircleSubscriptionVariables,
  APITypes.OnUpdateCircleSubscription
>;
export const onUpdateCircleMembers = /* GraphQL */ `subscription OnUpdateCircleMembers(
  $filter: ModelSubscriptionCircleMembersFilterInput
) {
  onUpdateCircleMembers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCircleMembersSubscriptionVariables,
  APITypes.OnUpdateCircleMembersSubscription
>;
export const onUpdateCircleVehicles = /* GraphQL */ `subscription OnUpdateCircleVehicles(
  $filter: ModelSubscriptionCircleVehiclesFilterInput
) {
  onUpdateCircleVehicles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCircleVehiclesSubscriptionVariables,
  APITypes.OnUpdateCircleVehiclesSubscription
>;
export const onUpdateCity = /* GraphQL */ `subscription OnUpdateCity($filter: ModelSubscriptionCityFilterInput) {
  onUpdateCity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCitySubscriptionVariables,
  APITypes.OnUpdateCitySubscription
>;
export const onUpdateCustomer = /* GraphQL */ `subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onUpdateCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCustomerSubscriptionVariables,
  APITypes.OnUpdateCustomerSubscription
>;
export const onUpdateIncomeAndExpense = /* GraphQL */ `subscription OnUpdateIncomeAndExpense(
  $filter: ModelSubscriptionIncomeAndExpenseFilterInput
) {
  onUpdateIncomeAndExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateIncomeAndExpenseSubscriptionVariables,
  APITypes.OnUpdateIncomeAndExpenseSubscription
>;
export const onUpdateInstallment = /* GraphQL */ `subscription OnUpdateInstallment(
  $filter: ModelSubscriptionInstallmentFilterInput
) {
  onUpdateInstallment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstallmentSubscriptionVariables,
  APITypes.OnUpdateInstallmentSubscription
>;
export const onUpdateLoan = /* GraphQL */ `subscription OnUpdateLoan($filter: ModelSubscriptionLoanFilterInput) {
  onUpdateLoan(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLoanSubscriptionVariables,
  APITypes.OnUpdateLoanSubscription
>;
export const onUpdateLoanSerialNumber = /* GraphQL */ `subscription OnUpdateLoanSerialNumber(
  $filter: ModelSubscriptionLoanSerialNumberFilterInput
) {
  onUpdateLoanSerialNumber(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLoanSerialNumberSubscriptionVariables,
  APITypes.OnUpdateLoanSerialNumberSubscription
>;
export const onUpdateMember = /* GraphQL */ `subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
  onUpdateMember(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMemberSubscriptionVariables,
  APITypes.OnUpdateMemberSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onUpdateTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
export const onUpdateVehicle = /* GraphQL */ `subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
  onUpdateVehicle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVehicleSubscriptionVariables,
  APITypes.OnUpdateVehicleSubscription
>;
