import { client } from "./queryProvider";
import {
  Installment,
  PaymentMethod,
  TransactionEventType,
  UpdateInstallmentInput,
  UpdateLoanInput,
} from "@/models/API";
import { LambdaResponse } from "@/models/customModels/customModels";
import { removeInstallment } from "@/models/mutations";
import { GraphQLResult } from "aws-amplify/api";

/**
 * *🔥Fetches installments based on the provided loan details.
 *
 * @param {LoanDetails} loanDetails - The loan details object containing the loan ID and loan admin ID.
 * @returns {Promise<Installment[]>} - A promise that resolves to an array of installments.
 * @throws {Error} - If there are any errors during the API call.
 */

interface LoanDetails {
  loanID: string;
  loanAdminID: string;
}

export const getInstallments = async ({
  loanID,
  loanAdminID,
}: LoanDetails): Promise<Installment[]> => {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `query ByLoanInstallment(
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
                  collectionAgentDetails {
                    agentID
                    name
                    phoneNumber
                  }
                  createdAt
                  customerName
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
            `,
      variables: {
        loanID: loanID,
        loanAdminID: { eq: loanAdminID },
        limit: 15000,
      },
    });
    if (result.errors) {
      console.error(JSON.stringify(result.errors));
      throw new Error(JSON.stringify(result.errors));
    }
    return result.data.byLoanInstallment.items;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching installments");
  }
};

/**
 * Updates an installment and its corresponding transaction in the system.
 *
 * @param {Object} params - The parameters for updating the installment.
 * @param {UpdateInstallmentInput} params.installment - The installment details to be updated.
 * @returns {Promise<string>} - A promise that resolves to the ID of the updated installment.
 *
 * @throws {Error} - Throws an error if the update operation fails.
 *
 * The GraphQL mutation updates both the installment and the transaction with the provided details.
 * If any errors occur during the GraphQL request, they are logged to the console and an error is thrown.
 */

export const modifyInstallment = async ({
  updatedInstallment,
  updatedLoan,
}: {
  updatedInstallment: UpdateInstallmentInput;
  updatedLoan: UpdateLoanInput;
}): Promise<{ adminID: string; loanID: string }> => {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `mutation MyMutation(
        $id: ID!,
        $adminID: String!,
        $paidAmount: Int!,
        $paidDate: AWSDateTime!,
        $initialAmount: Int!,
        $updatedDate: AWSDate!,
        $id1: ID!,
        $adminID1: String!,
        $initialAmount1: Int!,
        $updatedDate1: AWSDate!,
        $dateTime: AWSDateTime!,
        $amount: Int!,
        $transactionEvent: TransactionEventType!,
        $paymentMethod: PaymentMethod!,
        $description: String!,
        $id2: ID!,
        $adminID2: String!,
        $totalPaidAmount: Int!,
        $loanStatus: LoanStatus!
      ) {
        updateInstallment(input: {
          adminID: $adminID,
          id: $id,
          initialAmount: $initialAmount,
          paidAmount: $paidAmount,
          paidDate: $paidDate,
          updatedDate: $updatedDate
        }) {
          loanID
          loanAdminID
        }
        updateTransaction(input: {
          id: $id1,
          adminID: $adminID1,
          initialAmount: $initialAmount1,
          updatedDate: $updatedDate1,
          dateTime: $dateTime,
          amount: $amount,
          additionalInfo: {
            transactionEvent: $transactionEvent,
            paymentMethod: $paymentMethod,
            description: $description
          }
        }) {
          id
        }
        updateLoan(input: {
          id: $id2,
          adminID: $adminID2,
          paidAmount: $totalPaidAmount,
          status: $loanStatus
        }){
          id
        }
      }`,
      variables: {
        id: updatedInstallment.id,
        adminID: updatedInstallment.adminID,
        paidAmount: updatedInstallment.paidAmount,
        paidDate: updatedInstallment.paidDate,
        initialAmount: updatedInstallment.initialAmount,
        updatedDate: updatedInstallment.updatedDate,
        // Transaction variables
        id1: updatedInstallment.id,
        adminID1: updatedInstallment.adminID,
        initialAmount1: updatedInstallment.initialAmount,
        updatedDate1: updatedInstallment.updatedDate,
        dateTime: updatedInstallment.paidDate,
        amount: updatedInstallment.paidAmount,
        paymentMethod: PaymentMethod.CASH,
        transactionEvent: TransactionEventType.UPDATE_INSTALLMENT,
        description: `Installment Updated by ADMIN, Loan Serial: ${updatedLoan.loanSerial}`,
        // Loan variables
        id2: updatedLoan.id,
        adminID2: updatedLoan.adminID,
        totalPaidAmount: updatedLoan.paidAmount,
        loanStatus: updatedLoan.status,
      },
    });
    if (result.errors) {
      console.error(JSON.stringify(result.errors));
      throw new Error(JSON.stringify(result.errors, null, 2));
    }
    return {
      adminID: result.data.updateInstallment.loanAdminID,
      loanID: result.data.updateInstallment.loanID,
    };
  } catch (error) {
    console.log('variables', JSON.stringify(updatedInstallment, null, 2), JSON.stringify(updatedLoan, null, 2));
    console.error("Error in modifyInstallment", error);
    console.error(error);
    throw new Error("Error updating installment");
  }
};

interface DeleteInstallmentProps {
  adminId: string;
  customerId: string;
  loanId: string;
  installmentId: string;
  paidAmount: number;
  paidInstallments: number;
  status: string;
  shouldUpdateCustomer: boolean;
  nextDueDate: string;
  password: string;
}
export const deleteInstallment = async ({
  ...p
}: DeleteInstallmentProps): Promise<LambdaResponse> => {
  try {
    const { data, errors } = await client.graphql({
      query: removeInstallment,
      variables: {
        ...p,
        installmentDeletionPassword: p.password,
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(JSON.stringify(errors));
    }
    const result: LambdaResponse = JSON.parse(data.removeInstallment);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting installment");
  }
};
