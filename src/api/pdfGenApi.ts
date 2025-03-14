import { GraphQLResult } from "aws-amplify/api";
import { client } from "./queryProvider";
import {
  InstallmentPrintModel,
  LoanPrintModel,
} from "@/models/customModels/customModels";
import { InstallmentStatus } from "@/models/API";

/**
 * query MyQuery($customerID: ID = "", $customerAdminID: ModelStringKeyConditionInput = {eq: ""}, $filter: ModelLoanFilterInput = {dateOfCreation: {between: ""}}) {
  byCustomerLoan(customerID: $customerID, customerAdminID: $customerAdminID, filter: $filter) {
    items {
      collectibleAmount
      customer {
        customers {
          customerName
          phone
        }
        city {
          name
        }
      }
      loanSerial
      givenAmount
      installmentType
      totalInstallments
    }
  }
}
 */

type getNewLoansAndInstallmentsProps = {
  circleID: string;
  toDate: string;
  fromDate: string;
};

export const getNewLoansAndInstallments = async ({
  circleID,
  toDate,
  fromDate,
}: getNewLoansAndInstallmentsProps): Promise<{
  newInstallments: InstallmentPrintModel[];
  newLoans: LoanPrintModel[];
}> => {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `query MyQuery(
                $circleID: ID!,
                $dateOfCreation: ModelStringKeyConditionInput!,
                $limit: Int!,
                $circleID1: ID!,
                $paidDate: ModelStringKeyConditionInput!,
                $limit1: Int!
                $filter: ModelInstallmentFilterInput
            ) {
                loanByCircleAndDate(
                    circleID: $circleID,
                    dateOfCreation: $dateOfCreation,
                    limit: $limit
                ) {
                    items {
                        collectibleAmount
                        customer {
                            customers {
                                customerName
                                phone
                            }
                            city {
                                name
                            }
                            oldLoanInfo {
                                loanSerial
                                totalCollectedAmount
                            }
                        }
                        loanSerial
                        givenAmount
                        installmentType
                        totalInstallments
                    }
                }
                installmentByCircleAndPaidDate(
                    circleID: $circleID1,
                    paidDate: $paidDate,
                    limit: $limit1,
                    filter: $filter
                ) {
                    items {
                        customerName
                        loanSerial
                        city
                        paidAmount
                        paymentMethod
                    }
                }
            }`,
      variables: {
        circleID: circleID,
        dateOfCreation: { between: [fromDate, toDate] },
        limit: 1000,
        circleID1: circleID,
        paidDate: { between: [fromDate, toDate] },
        limit1: 1000,
        filter: { status: { eq: InstallmentStatus.PAID } },
      },
    });

    if (result.errors) {
      console.error(`GraphQL Errors: ${JSON.stringify(result.errors)}`);
      throw new Error("GraphQL query failed");
    }

    const loans = result.data.loanByCircleAndDate.items;
    const installments = result.data.installmentByCircleAndPaidDate.items;

    const newLoans: LoanPrintModel[] = loans.map((loan: any) => {
      const {
        loanSerial,
        givenAmount,
        collectibleAmount,
        totalInstallments,
        installmentType,
      } = loan;
      const { customerName, phone: customerPhone } = loan.customer.customers[0];
      const { name: customerAddress } = loan.customer.city;
      const {
        loanSerial: oldId = null,
        totalCollectedAmount: oldAmount = null,
      } = loan.customer.oldLoanInfo || {};

      return {
        loanSerial,
        customerName,
        customerPhone,
        customerAddress,
        givenAmount,
        collectibleAmount,
        totalInstallments,
        installmentType,
        oldId,
        oldAmount,
      };
    });

    const newInstallments: InstallmentPrintModel[] = installments.map(
      (installment: any) => {
        const { loanSerial, customerName, city, paidAmount, paymentMethod } =
          installment;
        return {
          loanSerial,
          customerName,
          city,
          paidAmount,
          paymentMethod,
        };
      }
    );

    return {
      newInstallments,
      newLoans,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw new Error(`Failed to fetch data: ${error}`);
  }
};
