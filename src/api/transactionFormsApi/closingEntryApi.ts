import {
  CashAccount,
  VerifyClosingTransactionMutationVariables,
} from "@/models/API";
import { client } from "../queryProvider";
import { GraphQLResult } from "aws-amplify/api";

/**
 * Creates a closing cash account entry.
 *
 * @param {Object} params - The parameters for creating the closing cash account entry.
 * @param {CreateCashAccountInput} params.cashAccountInput - The input data for creating the cash account.
 * @returns {Promise<CashAccount>} - A promise that resolves to the created cash account.
 * @throws Will throw an error if the GraphQL request fails.
 */

export const createClosingCashAccountEntry = async ({
  ...prop
}: VerifyClosingTransactionMutationVariables) => {
  // console.log(prop);
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `
      mutation MyMutation(
        $writeOff: Int!, 
        $outstandingAmount: Int!, 
        $openingEntryDate: AWSDateTime!, 
        $openingBalance: Int!, 
        $existingLoanOutstanding: Int!,
        $interest: Int!,
        $description: String!, 
        $closingEntryDate: AWSDateTime!, 
        $closingBalance: Int!, 
        $circleId: String!, 
        $cashflowOut: Int!, 
        $cashflowIn: Int!, 
        $businessLoss: Int!, 
        $adminId: String!, 
        $adminEmailId: AWSEmail!
        $loansGiven: Int!
        $repayments: Int!
      ) {
        verifyClosingTransaction(
        adminEmailId: $adminEmailId
        adminId: $adminId
        cashflowIn: $cashflowIn
        cashflowOut: $cashflowOut
        circleId: $circleId
        closingBalance: $closingBalance
        closingEntryDate: $closingEntryDate
        openingBalance: $openingBalance
        openingEntryDate: $openingEntryDate
        outstandingAmount: $outstandingAmount
        businessLoss: $businessLoss
        description: $description
        existingLoanOutstanding: $existingLoanOutstanding
        interest: $interest
        writeOff: $writeOff
        loansGiven: $loansGiven
        repayments: $repayments
        )
      }
      `,
      variables: { ...prop },
    });

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }
    const data: CashAccount = result.data;
    return data;
  } catch (error) {
    // Log the error with more context
    console.error(
      "Failed to create closing cash account entry:",
      JSON.stringify(error, null, 2)
    );
    if (error instanceof Error) {
      throw new Error(
        `Failed to create closing cash account entry: ${error.message}`
      );
    } else {
      throw new Error(
        "Failed to create closing cash account entry: Unknown error"
      );
    }
  }
};

/** Depcreated Query
 * `mutation MyMutation($input: CreateCashAccountInput!) {
        createCashAccount(input: $input) {
          adminID
          adminEmailId
          circleID
          cashflowIn
          cashflowOut
          openingBalance
          openingEntryDate
          closingBalance
          closingEntryDate
          createdAt
          loansGiven //!remove 
          outstandingAmount //!remove
          repayments
          updatedAt
          __typename
        }
      }`,
 */
