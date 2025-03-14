import { client } from "../queryProvider";
import {
  Transaction,
  TransactionType,
  PaymentMethod,
  IncomeOrExpenseType,
  CreateTransactionInput,
  CreateIncomeAndExpenseInput,
  UpdateTransactionInput,
  UpdateIncomeAndExpenseInput,
  AdditionalTransactionInfoInput,
  TransactionEventType,
} from "@/models/API";
import { GraphQLResult } from "aws-amplify/api";
import { v4 as uuidv4 } from "uuid";

type TransactionProps = {
  adminID: string;
  adminName: string;
  adminphoneNumber: string;
  adminEmailId: string;
  amount: number;
  belongsTo: string;
  description: string;
  personName: string;
  circleDateOfCreation: string;
  circleID: string;
  city: string;
  customerName: string;
  tDateTime: string;
  tDate: string;
  incomeOrExpenseType: IncomeOrExpenseType;
  paymentMethod: PaymentMethod;
  transactionType: TransactionType;
};

export async function transactionOperationsApi({
  ...p
}: TransactionProps): Promise<Transaction> {
  const id = uuidv4();
  const additionalInfo: AdditionalTransactionInfoInput = {
    description: p.description,
    paymentMethod: p.paymentMethod,
    transactionEvent: TransactionEventType.NEW_TRANSACTION,
    memberName: p.personName,
    memberID: p.belongsTo,
  };
  const transaction: CreateTransactionInput = {
    additionalInfo,
    id: id,
    adminID: p.adminID,
    amount: p.amount,
    circleID: p.circleID,
    circleDateOfCreation: p.circleDateOfCreation,
    dateTime: p.tDateTime,
    transactionType: p.transactionType,
  };
  const incomeAndExpense: CreateIncomeAndExpenseInput = {
    id: id,
    incomeOrExpenseType: p.incomeOrExpenseType,
    adminEmailId: p.adminEmailId,
    adminID: p.adminID,
    amount: p.amount,
    belongsTo: p.belongsTo,
    circleDateOfCreation: p.circleDateOfCreation,
    circleID: p.circleID,
    date: p.tDate,
    description: p.description,
    name: p.personName,
  };
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `mutation CreateTransactionAndIncomeAndExpense(
                $transactionInput: CreateTransactionInput!,
                $incomeAndExpenseInput:  CreateIncomeAndExpenseInput!
                ){
        createTransaction(input: $transactionInput){
                    id
                }
        createIncomeAndExpense(input: $incomeAndExpenseInput){
                    id
                }
            }
            `,
      variables: {
        transactionInput: transaction,
        incomeAndExpenseInput: incomeAndExpense,
      },
    });

    if (result.errors) {
      console.table(p);
      console.error(`***${JSON.stringify(result.errors)}***`);
      throw new Error(result.errors[0].message);
    }

    return transaction as Transaction;
  } catch (e: any) {
    console.error(`***${JSON.stringify(e)}***`);
    throw new Error(JSON.stringify(e));
  }
}

// update transaction and update income and expense

type UpdateTransactionProps = {
  transaction: UpdateTransactionInput;
  incomeAndExpense: UpdateIncomeAndExpenseInput;
};

export async function updateTransaction({
  transaction,
  incomeAndExpense,
}: UpdateTransactionProps): Promise<Transaction> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `mutation UpdateTransactionAndIncomeAndExpense(
        $transactionInput: UpdateTransactionInput!,
        $incomeAndExpenseInput:  UpdateIncomeAndExpenseInput!
        ){
      updateTransaction(input: $transactionInput){
        additionalInfo {
          description
          paymentMethod
          memberName
          memberID
          transactionEvent
        }
        adminID
        amount
        createdAt
        dateTime
        id
        transactionType
        updatedAt
        circleDateOfCreation
        circleID
        __typename
        }
        updateIncomeAndExpense(input: $incomeAndExpenseInput){
        id
        }
      }
      `,
      variables: {
        transactionInput: transaction,
        incomeAndExpenseInput: incomeAndExpense,
      },
    });

    if (result.errors) {
      console.error(`***${JSON.stringify(result.errors)}***`);
      throw new Error(result.errors[0].message);
    }
    return result.data.updateTransaction as Transaction;
  } catch (e: any) {
    console.error(`***${JSON.stringify(e)}***`);
    throw new Error(JSON.stringify(e));
  }
}


/**
 * Removes a transaction and its associated income/expense records from the system.
 * 
 * @param params - The parameters object containing transaction details
 * @param params.id - The unique identifier of the transaction to remove
 * @param params.adminID - The administrator ID associated with the transaction
 * 
 * @returns A Promise that resolves to the ID of the deleted transaction
 * *{{"deleteTransaction":{"id":"bfcdb509-211f-4819-b844-6332649ff1fe"},"deleteIncomeAndExpense":{"id":"bfcdb509-211f-4819-b844-6332649ff1fe"}}}
 * 
 * @throws {Error} If there are GraphQL errors during deletion
 * @throws {Error} If there are any other errors during the operation
 * 
 * @example
 * try {
 *   const deletedId = await removeTransaction({
 *     id: "transaction123",
 *     adminID: "admin456"
 *   });
 * } catch (error) {
 *   console.error(error);
 * }
 */
export async function removeTransaction({
  id,
  adminID,
}: {
  id: string;
  adminID: string;
}): Promise<string> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `mutation DeleteTransactionAndIncomeAndExpense(
      $input: DeleteTransactionInput!,
      $input1: DeleteIncomeAndExpenseInput!
      ) {
        deleteTransaction(input: $input) {
          id
        }
        deleteIncomeAndExpense(input: $input1) {
          id
        }
      }`,
      variables: {
        input: {
          id,
          adminID,
        },
        input1: {
          id,
          adminID,
        },
      },
    });
    if (result.errors) {
      console.error(`***${JSON.stringify(result.errors)}***`);
      throw new Error(result.errors[0].message);
    }
    console.log(JSON.stringify(result.data));
    return result.data.deleteTransaction
  } catch (e: any) {
    console.error(`***${JSON.stringify(e)}***`);
    throw new Error(JSON.stringify(e));
  }
}
