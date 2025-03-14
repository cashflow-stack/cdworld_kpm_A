import { CashAccount, ModelSortDirection } from "@/models/API";
import { client } from "./queryProvider";
import {
  byCircleCashHistoryQuery,
  byCircleCashQuery,
} from "@/models/customModels/customQueries";
import { SimplifiedClosingEntry } from "@/models/customModels/customModels";
import { getCashAccount } from "@/models/queries";

type GetCashAccountProps = {
  circleID: string;
  lastClosingDate: string;
  limit?: number;
};

export async function getCashAccountEntries({
  circleID,
  lastClosingDate,
  limit,
}: GetCashAccountProps): Promise<CashAccount[]> {
  try {
    const { data, errors } = await client.graphql({
      query: byCircleCashQuery,
      variables: {
        circleID,
        closingEntryDate: { lt: lastClosingDate },
        sortDirection: ModelSortDirection.DESC,
        limit: limit || 1,
      },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw errors;
    }
    return data.byCircleCash.items;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

/**
 * Fetches the cash account history for a given circle within a specified date range.
 *
 * @param {Object} params - The parameters for fetching cash account history.
 * @param {string} params.circleID - The ID of the circle to fetch the cash account history for.
 * @param {string} params.from - The start date of the date range to fetch the cash account history.
 * @param {string} params.to - The end date of the date range to fetch the cash account history.
 * @returns {Promise<CashAccount[]>} A promise that resolves to an array of cash account history items.
 * @throws Will throw an error if the GraphQL query fails.
 */
type GetCashAccountHistoryProps = {
  circleID: string;
  fromDate: string;
  toDate: string;
  token?: string | null;
  limit?: number;
};

export async function getCashAccountHistory({
  circleID,
  fromDate,
  toDate,
  token,
  limit,
}: GetCashAccountHistoryProps): Promise<{
  items: CashAccount[];
  nextToken?: string | null;
}> {
  try {
    const { data, errors } = await client.graphql({
      query: byCircleCashQuery,
      variables: {
        circleID,
        closingEntryDate: { between: [fromDate, toDate] },
        sortDirection: ModelSortDirection.DESC,
        nextToken: token,
        limit: limit || 10,
      },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw errors;
    }
    const { items, nextToken } = data.byCircleCash;
    return { items, nextToken };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function getCashAccountHistoryList({
  circleID,
  fromDate,
  toDate,
  token,
  // limit,
}: GetCashAccountHistoryProps): Promise<{
  items: SimplifiedClosingEntry[];
  nextToken?: string | null;
}> {
  try {
    const { data, errors } = await client.graphql({
      query: byCircleCashHistoryQuery,
      variables: {
        circleID,
        closingEntryDate: { between: [fromDate, toDate] },
        sortDirection: ModelSortDirection.ASC,
        nextToken: token,
        // limit: limit || 50,
      },
    });
    console.log(JSON.stringify(data, null, 2));
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw errors;
    }
    const { items, nextToken } = data.byCircleCash;
    const simplifiedItems = items.map((item) => ({
      id: item.id,
      openingDate: item.openingEntryDate,
      closingDate: item.closingEntryDate,
      investment: item.closingSnapshot.investments,
      collection: item.closingSnapshot.repayments,
      excess: item.closingSnapshot.excessCollection,
      interest: item.closingSnapshot.interest,
      income: item.closingSnapshot.incomes,
      newLoans: item.closingSnapshot.loansGiven + item.closingSnapshot.interest,
      withdrawals: item.closingSnapshot.withdrawals,
      expenses: item.closingSnapshot.expenses,
      deficit: item.closingSnapshot.deficit,
      chits: item.closingSnapshot.chits,
      balance: item.closingBalance,
      openingBalance: item.openingBalance,
    }));
    return { items: simplifiedItems, nextToken };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function getCashAccountTransactionDetails({
  cashAccountID,
}: {
  cashAccountID: string;
}): Promise<CashAccount> {
  try {
    const { data, errors } = await client.graphql({
      query: getCashAccount,
      variables: {
        id: cashAccountID,
      },
    });
    if (errors) {
      console.error(JSON.stringify(errors, null, 2));
      throw new Error(errors.map((e: any) => e.message).join(", "));
    }
    const cashAccount = data.getCashAccount;

    if (!cashAccount) {
      throw new Error("Cash account not found");
    }
    return cashAccount;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      throw new Error(`Failed to fetch cash account details: ${error.message}`);
    } else {
      throw new Error("Failed to fetch cash account details: Unknown error");
    }
  }
}
