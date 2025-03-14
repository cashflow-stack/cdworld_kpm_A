import { byMembersID, getIncomeAndExpense } from "@/models/queries";
import { client } from "./queryProvider";
import { IncomeAndExpense } from "@/models/API";

type IncomeAndExpenseProps = {
  memberId: string;
  date: string;
  circleId: string;
};

export const getIncomeAndExpenseList = async ({
  memberId,
  date,
  circleId,
}: IncomeAndExpenseProps): Promise<IncomeAndExpense[]> => {
  // if memberId is empty, return an empty array
  if (!memberId) {
    return [];
  }
  try {
    const { data, errors } = await client.graphql({
      query: byMembersID,
      variables: {
        belongsTo: memberId,
        date: { le: date },
        filter: { circleID: { eq: circleId } },
        limit: 15000,
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data.byMembersID.items;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw new Error(`Error fetching income and expense data: ${error}`);
  }
};


/**
 * Retrieves income and expense data by date for a specific member.
 *
 * @param {IncomeAndExpenseByDateProps} options - The options for retrieving income and expense data.
 * @param {string} options.memberId - The ID of the member.
 * @param {string} options.date - The date for which to retrieve income and expense data.
 * @returns {Promise<IncomeAndExpense | null>} - A promise that resolves to the income and expense data for the specified date, or null if no data is found.
 * @throws {Error} - If there is an error fetching the income and expense data.
 */
export const getIncomeAndExpenseByDate = async ({
  adminID,
  id,
}: {
  id: string;
  adminID: string;
}): Promise<IncomeAndExpense | null> => {
  try {
    const { data, errors } = await client.graphql({
      query: getIncomeAndExpense,
      variables: {
        adminID,
        id
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data.getIncomeAndExpense || null;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw new Error(`Error fetching income and expense data: ${error}`);
  }
};
