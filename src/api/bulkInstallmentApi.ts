import { SimplifiedLoan } from "@/models/customModels/customModels";
import { client } from "./queryProvider";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { bulkInstallmentPosting } from "@/models/queries";

interface BulkInstallmentInput {
  circleID: string;
  dateOfCreation: string;
  fromDate: string;
  toDate: string;
}
export async function fetchModifiedLoans({
  circleID,
  dateOfCreation,
  fromDate,
  toDate,
}: BulkInstallmentInput) {
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `
        query MyQuery(
          $circleID: ID!, 
          $dateOfCreation: ModelStringKeyConditionInput!, 
          $filter: ModelLoanFilterInput!, 
          $filter1: ModelInstallmentFilterInput!
          $limit: Int!
        ) {
          loanByCircleAndDate(circleID: $circleID, dateOfCreation: $dateOfCreation, filter: $filter, limit: $limit) {
            items {
              customer {
                city {
                  name
                }
                customers {
                  customerName
                }
                id
              }
              id
              collectibleAmount
              dateOfCreation
              installmentAmount
              installments(filter: $filter1) {
                items {
                  paidAmount
                }
              }
              loanSerial
              nextDueDate
              paidAmount
              paidInstallments
            }
          }
        }
      `,
      variables: {
        circleID,
        dateOfCreation: { lt: dateOfCreation },
        filter: {
          or: [
            {
              status: { eq: "ACTIVE" },
            },
            {
              status: { eq: "UNDERREVIEW" },
            },
          ],
        },
        filter1: { paidDate: { between: [fromDate, toDate] } },
        limit: 15000,
      },
    });
    if (errors) {
      throw new Error(`Error getting bulk installment: ${errors[0].message}`);
    }
    return data.loanByCircleAndDate.items;
  } catch (error) {
    throw new Error(`Error getting bulk installment: ${JSON.stringify(error)}`);
  }
}

export default async function getSimplifiedLoanData({
  circleID,
  dateOfCreation,
  fromDate,
  toDate,
}: BulkInstallmentInput): Promise<SimplifiedLoan[]> {
  try {
    const loans = await fetchModifiedLoans({
      circleID,
      dateOfCreation,
      fromDate,
      toDate,
    });
    const simplifiedLoans: SimplifiedLoan[] = [];
    loans.map((l: any) => {
      simplifiedLoans.push({
        loanId: l.id,
        customerId: l.customer.id,
        cityName: l.customer.city.name,
        customerName: l.customer.customers[0].customerName,
        collectibleAmount: l.collectibleAmount,
        installmentAmount: l.installmentAmount,
        loanSerial: l.loanSerial,
        totalPaidAmount: l.paidAmount,
        totalPaidInstallments: l.paidInstallments,
        nextDueDate: l.nextDueDate,
        loanDateOfCreation: l.dateOfCreation,
        hasInstallmentPaid: l.installments.items.length > 0,
        paidAmount: Array.isArray(l.installments.items)
          ? l.installments.items.reduce(
              (acc: number, i: { paidAmount: number }) => acc + i.paidAmount,
              0
            )
          : 0,
      });
    });
    simplifiedLoans.sort((a, b) => Number(a.loanSerial) - Number(b.loanSerial));
    return simplifiedLoans;
  } catch (error) {
    throw new Error(`Error getting bulk installment: ${JSON.stringify(error)}`);
  }
}

/**
 * Submits bulk installment entries to the server.
 *
 * @param {Object} params - The parameters for submitting bulk installment entries.
 * @param {string} params.adminId - The ID of the admin.
 * @param {string} params.circleId - The ID of the circle.
 * @param {string} params.circleDateofCreation - The date of creation of the circle.
 * @param {string} params.agentId - The ID of the agent.
 * @param {string} params.agentName - The name of the agent.
 * @param {string} params.agentPhoneNumber - The phone number of the agent.
 * @param {string} params.currentDateTime - The current date and time.
 * @param {string} params.installmentType - The type of installment.
 * @param {Array} params.bulkLoanDetails - The details of the bulk loan.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If there is an error posting the bulk installment.
 */

type PostingInput = {
  adminId: string;
  circleId: string;
  circleDateofCreation: string;
  agentId: string;
  agentName: string;
  agentPhoneNumber: string;
  currentDateTime: string;
  installmentType: string;
  bulkLoanDetails: string;
};

export async function submitBulkInstallmentEntries({
  adminId,
  circleId,
  circleDateofCreation,
  agentId,
  agentName,
  agentPhoneNumber,
  currentDateTime,
  installmentType,
  bulkLoanDetails,
}: PostingInput) {
  try {
    // console.log(
    //   "agentId",
    //   agentId,
    //   "agentName",
    //   agentName,
    //   "agentPhoneNumber",
    //   agentPhoneNumber,
    //   "circleDateofCreation",
    //   circleDateofCreation,
    //   "circleId",
    //   circleId,
    //   "currentDateTime",
    //   currentDateTime,
    //   "installmentType",
    //   installmentType
    // );
    // console.log(bulkLoanDetails, 0, null);
    const response = await client.graphql({
      query: bulkInstallmentPosting,
      variables: {
        adminId,
        agentId,
        agentName,
        agentPhoneNumber,
        bulkLoanDetails,
        circleDateofCreation,
        circleId,
        currentDateTime,
        installmentType,
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error posting bulk installment: ${JSON.stringify(error)}`);
  }
}
