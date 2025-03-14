import { client } from "./queryProvider";
import { byCustomerLoan, manageLoanExpiry } from "@/models/queries";
import { Loan, LoanStatus, ModelSortDirection } from "@/models/API";
import { GraphQLResult } from "aws-amplify/api";
import {
  calculatePendingInstallments,
  formatDateTimeToISOString,
  formatDateToYYYYMMDD,
} from "@/toolkit/helper/helperFunctions";
import { getPendingCustomersQuery } from "@/models/customModels/customQueries";
import {
  LambdaResponse,
  PendingCustomer,
  UnpaidLoan,
} from "@/models/customModels/customModels";
import { removeLoan } from "@/models/mutations";

/**
 * *🔥Retrieves a list of Installment for a given Loan.
 * @param customerID - The ID of the circle.
 * @param customerAdminID - The date of creation of the circle.
 * @returns A promise that resolves to an array of customer objects.
 */
interface CustomerDetails {
  customerID: string;
  customerAdminID: string;
}

export const getLoans = async ({
  customerID,
  customerAdminID,
}: CustomerDetails): Promise<Loan[]> => {
  const { data, errors } = await client.graphql({
    query: byCustomerLoan,
    variables: {
      customerID: customerID,
      customerAdminID: { eq: customerAdminID },
      limit: 15000,
    },
  });
  if (errors) {
    console.error(JSON.stringify(errors));
    throw new Error(JSON.stringify(errors));
  }
  return data.byCustomerLoan.items;
};

export const getOutstandingAmount = async ({
  circleID,
  date,
}: {
  circleID: string;
  date: string;
}): Promise<number> => {
  try {
    const response: GraphQLResult<any> = await client.graphql({
      query: `query LoanByCircleAndDate($circleID: ID!, $dateOfCreation: ModelStringKeyConditionInput!, $filter: ModelLoanFilterInput!, $limit: Int!) {
        loanByCircleAndDate(circleID: $circleID, dateOfCreation: $dateOfCreation, filter: $filter, limit: $limit) {
          items {
            collectibleAmount
            paidAmount
          }
        }
      }`,
      variables: {
        circleID: circleID,
        dateOfCreation: { le: date },
        sortDirection: ModelSortDirection.DESC,
        filter: { status: { eq: LoanStatus.ACTIVE } },
        limit: 15000,
      },
    });
    if (response.errors) {
      console.error(JSON.stringify(response.errors));
      throw new Error(JSON.stringify(response.errors));
    }
    const netOutstandingAmount = response.data.loanByCircleAndDate.items.reduce(
      (acc: number, item: any) =>
        acc + (item.collectibleAmount - item.paidAmount),
      0
    );
    return netOutstandingAmount;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch outstanding amount ${error}`);
  }
};

/**
 * Closes a loan by making a GraphQL request to the server.
 *
 * @param {Object} params - The parameters for closing the loan.
 * @param {string} params.adminId - The ID of the admin performing the action.
 * @param {string} params.closingLoanSerial - The serial number of the closing loan.
 * @param {string} params.closingReason - The reason for closing the loan.
 * @param {string} params.customerId - The ID of the customer whose loan is being closed.
 * @param {string} params.endDate - The end date of the loan.
 * @param {string} params.expireAt - The expiration date of the loan.
 * @param {string} params.loanId - The ID of the loan being closed.
 * @param {number} params.totalCollectedAmount - The total amount collected for the loan.
 * @param {string[]} params.updatedSerialNumbers - The updated serial numbers after closing the loan.
 * @returns {Promise<boolean>} - A promise that resolves to true if the loan was closed successfully, otherwise throws an error.
 * @throws {Error} - Throws an error if the loan could not be closed.
 */
type CloseLoanProps = {
  adminId: string;
  closingLoanSerial: string;
  closingReason: string;
  customerId: string;
  endDate: string;
  expireAt: number;
  loanId: string;
  totalCollectedAmount: number;
  updatedSerialNumbers: string[];
};

export const closeLoan = async ({
  adminId,
  closingLoanSerial,
  closingReason,
  customerId,
  endDate,
  expireAt,
  loanId,
  totalCollectedAmount,
  updatedSerialNumbers,
}: CloseLoanProps): Promise<boolean> => {
  try {
    const response: GraphQLResult<any> = await client.graphql({
      query: manageLoanExpiry,
      variables: {
        adminId: adminId,
        closingLoanSerial: closingLoanSerial,
        closingReason: closingReason,
        customerId: customerId,
        endDate: endDate,
        expireAt: expireAt,
        loanId: loanId,
        totalCollectedAmount: totalCollectedAmount,
        updatedSerialNumbers: updatedSerialNumbers,
      },
    });
    if (response.errors) {
      console.error(JSON.stringify(response.errors));
      throw new Error(JSON.stringify(response.errors));
    }
    // console.log("Loan closed successfully", JSON.stringify(response));
    return true;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to close loan ${error}`);
  }
};

interface OnProcessLoanTerminationProps {
  agentId: string;
  agentName: string;
  agentPhoneNumber: string;
  circleDateofCreation: string;
  loan: Loan;
  closingReason: string;
  customerName: string;
  expireAt: number;
  updatedSerialNumbers: string[];
  password: string;
}

export const processLoanTermination = async ({
  agentId,
  agentName,
  agentPhoneNumber,
  loan,
  closingReason,
  circleDateofCreation,
  customerName,
  expireAt,
  updatedSerialNumbers,
  password,
}: OnProcessLoanTerminationProps) => {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `
      mutation ManageLoanTermination(
        $agentId: String!,
        $agentName: String!,
        $agentPhoneNumber: AWSPhone!,
        $adminId: String!,
        $circleDateofCreation: AWSDate!,
        $circleId: String!,
        $closingLoanSerial: String!,
        $closingReason: String!,
        $customerId: String!,
        $customerName: String!,
        $endDate: AWSDate!,
        $dateTime: AWSDateTime!,
        $expireAt: AWSTimestamp!,
        $givenAmount: Int!,
        $installmentAmount: Int!,
        $loanId: String!,
        $loanSerial: String!,
        $lTPassword: String!,
        $paidInstallments: Int!,
        $totalCollectedAmount: Int!,
        $totalOutstandingAmount: Int!,
        $updatedSerialNumbers: [String]!
      ) {
        manageLoanTermination(
        agentName: $agentName,
        agentPhoneNumber: $agentPhoneNumber,
        agentId: $agentId,
        adminId: $adminId,
        circleDateofCreation: $circleDateofCreation,
        circleId: $circleId,
        closingLoanSerial: $closingLoanSerial,
        closingReason: $closingReason,
        customerId: $customerId,
        customerName: $customerName,
        endDate: $endDate,
        dateTime: $dateTime,
        expireAt: $expireAt,
        givenAmount: $givenAmount,
        installmentAmount: $installmentAmount,
        loanId: $loanId,
        loanSerial: $loanSerial,
        lTPassword: $lTPassword,
        paidInstallments: $paidInstallments,
        totalCollectedAmount: $totalCollectedAmount,
        totalOutstandingAmount: $totalOutstandingAmount,
        updatedSerialNumbers: $updatedSerialNumbers
        )
      }
      `,
      variables: {
        agentId: agentId,
        agentName: agentName,
        agentPhoneNumber: agentPhoneNumber,
        adminId: loan.adminID,
        circleDateofCreation: circleDateofCreation,
        circleId: loan.circleID,
        closingLoanSerial: loan.loanSerial,
        closingReason: closingReason,
        customerId: loan.customerID,
        customerName: customerName,
        endDate: formatDateToYYYYMMDD(new Date()),
        dateTime: formatDateTimeToISOString(new Date()),
        expireAt: expireAt,
        givenAmount: loan.givenAmount,
        installmentAmount: loan.installmentAmount,
        loanId: loan.id,
        loanSerial: loan.loanSerial,
        paidInstallments: loan.paidInstallments,
        totalCollectedAmount: loan.paidAmount,
        totalOutstandingAmount: loan.collectibleAmount,
        updatedSerialNumbers: updatedSerialNumbers,
        lTPassword: password,
      },
    });
    if (result.errors) {
      console.error(JSON.stringify(result.errors));
      throw new Error(JSON.stringify(result.errors));
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to close loan ${error}`);
  }
};

export const getPendingCustomers = async ({
  circleID,
}: {
  circleID: string;
}): Promise<PendingCustomer[]> => {
  const today = formatDateToYYYYMMDD(new Date());
  try {
    const response: GraphQLResult<any> = await client.graphql({
      query: getPendingCustomersQuery,
      variables: {
        circleID: circleID,
        filter: {
          nextDueDate: { lt: today },
          status: { eq: LoanStatus.ACTIVE },
        },
        sortDirection: ModelSortDirection.ASC,
      },
    });
    if (response.errors) {
      console.error(JSON.stringify(response.errors));
      throw new Error(JSON.stringify(response.errors));
    }
    return getPendingCustomersByCircle({
      unpaidLoans: response.data.loanByCircleAndDate.items,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch pending customers ${error}`);
  }
};

const getPendingCustomersByCircle = ({
  unpaidLoans,
}: {
  unpaidLoans: UnpaidLoan[];
}): PendingCustomer[] => {
  const pendingCustomers: PendingCustomer[] = [];
  for (const unpaidLoan of unpaidLoans) {
    const { pendingAmount, pendingDays, pendingInstallments } =
      calculatePendingInstallments({
        loanStartDate: unpaidLoan.dateOfCreation,
        installmentAmount: unpaidLoan.installmentAmount,
        installmentType: unpaidLoan.installmentType,
        actualPaidAmount: unpaidLoan.paidAmount,
        paidInstallments: unpaidLoan.paidInstallments,
        nextDueDate: unpaidLoan.nextDueDate,
        endDate: unpaidLoan.endDate,
        totalOutstandingAmount: unpaidLoan.collectibleAmount,
        totalInstallments: unpaidLoan.totalInstallments,
      });
    const pendingCustomer: PendingCustomer = {
      id: unpaidLoan.id,
      name: unpaidLoan.customer.customers[0].customerName,
      phoneNumber: unpaidLoan.customer.customers[0].phone,
      loanSerial: unpaidLoan.loanSerial,
      city: unpaidLoan.customer.city.name,
      pendingAmount,
      daysDelay: pendingDays,
      pendingInstallments,
    };
    pendingCustomers.push(pendingCustomer);
  }
  return pendingCustomers;
};

type DeleteLoanProps = {
  adminId: string;
  circleId: string;
  customerId: string;
  loanId: string;
  loanSerial: string;
  loanDeletionPassword: string;
  outstandingAmount: number;
  dateTime: string;
  paidAmount: number;
  givenAmount: number;
  memberId: string;
  memberName: string;
};

export const deleteLoan = async ({
  ...p
}: DeleteLoanProps): Promise<LambdaResponse> => {
  try {
    const { data, errors } = await client.graphql({
      query: removeLoan,
      variables: {
        ...p,
      },
    });
    if (errors) {
      console.error(JSON.stringify(errors));
      throw new Error(JSON.stringify(errors));
    }
    const result: LambdaResponse = JSON.parse(data.removeLoan);
    console.log("Loan deleted successfully", JSON.stringify(result));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting loan");
  }
};
