import * as APITypes from "../API";
import { ByModifiedCircleCashQuery } from "./customModels";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const byCustomAdminTransaction = /* GraphQL */ `query ByAdminTransaction(
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
    additionalInfo {
        city
        collectionAgentDetails {
          agentID
          name
          phoneNumber
        }
        customerName
        description
        loanSerial
        memberName
        paymentMethod
        transactionEvent
      }
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

// create custom query to get pending customers
export const getPendingCustomersQuery = /* GraphQL */ `query MyQuery(
  $circleID: ID!
  $filter: ModelLoanFilterInput
) {
  loanByCircleAndDate(
    circleID: $circleID
    filter: $filter
  ) {
    items {
      collectibleAmount
      customer {
        city {
          name
        }
        customers {
          customerName
          phone
        }
      }
      endDate
      dateOfCreation
      id
      installmentAmount
      installmentType
      loanSerial
      nextDueDate
      paidAmount
      paidInstallments
      totalInstallments
    }
  }
}
` as GeneratedQuery<
  APITypes.LoanByCircleAndDateQueryVariables,
  APITypes.LoanByCircleAndDateQuery
>;

export const byCircleCashQuery = /* GraphQL */ `query ByCircleCash(
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleCashQueryVariables,
  ByModifiedCircleCashQuery
>;

export const byCircleCashHistoryQuery = /* GraphQL */ `query ByCircleCash(
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
      openingBalance
      closingEntryDate
      closingBalance
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
      id
      openingEntryDate
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ByCircleCashQueryVariables,
  ByModifiedCircleCashQuery
>;
