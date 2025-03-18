import { ModelSortDirection, Transaction } from "@/models/API";
import { client } from "./queryProvider";
import { GraphQLResult } from "aws-amplify/api";
import { byCustomAdminTransaction } from "@/models/customModels/customQueries";

type TransacitonProps = {
  circleID: string;
  fromDate: string;
  toDate: string;
};

export const getTransactions = async ({
  circleID,
  fromDate,
  toDate,
}: TransacitonProps): Promise<Transaction[]> => {
  const result: GraphQLResult<any> = await client.graphql({
    query: `query GetTransactions(
        $circleID: ID!,
        $dateTime: ModelStringKeyConditionInput,
        $filter: ModelTransactionFilterInput,
        $limit: Int!,
        $sortDirection: ModelSortDirection!
        ) {
            byCircleTransactionDate(
                circleID: $circleID,
                dateTime: $dateTime,
                filter: $filter,
                limit: $limit,
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
                        totalOutstandingAmount
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
                }
                nextToken
            }
        }
        `,
    variables: {
      circleID: circleID,
      dateTime: { between: [fromDate, toDate] },
      limit: 15000,
      sortDirection: ModelSortDirection.DESC,
    },
  });
  if (result.errors) {
    console.error(`***${result.errors}***`);
    throw new Error(
      `Failed to fetch transactions ${JSON.stringify(result.errors)}`
    );
  }
  return result.data.byCircleTransactionDate.items;
};

export const getTransactionsByDate = async ({
  adminID,
  dateTime,
  circleID,
}: {
  adminID: string;
  dateTime: string;
  circleID: string;
}): Promise<Transaction[]> => {
  try {
    const { data, errors } = await client.graphql({
      query: byCustomAdminTransaction,
      variables: {
        adminID,
        dateTime: { ge: dateTime },
        sortDirection: ModelSortDirection.DESC,
        filter: { circleID: { eq: circleID } },
        limit: 15000,
      },
    });
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    return data.byAdminTransaction.items as Transaction[];
  } catch (error) {
    throw new Error(`Failed to fetch transactions ${error}`);
  }
};
