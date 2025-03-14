import { createTransaction, updateTransaction } from "@/models/mutations";
import { client } from "../queryProvider";
import {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "@/models/API";

export async function createNewCaptialTransaction({
  newCaptialTrancation,
}: {
  newCaptialTrancation: CreateTransactionInput;
}): Promise<Transaction> {
  try {
    // Create a new captial transaction
    const { data, errors } = await client.graphql({
      query: createTransaction,
      variables: {
        input: newCaptialTrancation,
      },
    });
    if (errors) {
      console.error(`❓❓❓${JSON.stringify(errors)}***`);
      throw new Error(errors[0].message);
    }
    return data.createTransaction;
  } catch (error) {
    console.error(`***${JSON.stringify(error)}***`);
    throw new Error(JSON.stringify(error));
  }
}

export async function updateCaptialTransaction({
  captialTransaction,
}: {
  captialTransaction: UpdateTransactionInput;
}): Promise<Transaction> {
  try {
    const { data, errors } = await client.graphql({
      query: updateTransaction,
      variables: {
        input: captialTransaction,
      },
    });
    if (errors) {
      console.error(`❌❌❌${JSON.stringify(errors)}***`);
      throw new Error(errors[0].message);
    }
    return data.updateTransaction;
  } catch (error) {
    console.error(`***${JSON.stringify(error)}***`);
    throw new Error(JSON.stringify(error));
  }
}
