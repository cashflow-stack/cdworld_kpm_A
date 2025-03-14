import { GraphQLResult } from "aws-amplify/api";
import { client } from "./queryProvider";
import {
  FinanceBook,
  FinancialItem,
  modifiedCustomer,
  SimplifiedCustomer,
} from "@/models/customModels/customModels";
import {
  CreateCustomerInput,
  CreateInstallmentInput,
  CreateLoanInput,
  CreateTransactionInput,
  Customer,
  InstallmentType,
  UpdateCustomerInput,
} from "@/models/API";
import { updateCustomer } from "@/models/mutations";
import { getCustomer } from "@/models/queries";

/**
 * *🔥Retrieves a list of Combination of CUSTOMER AND LOANS for a given circle.
 * @param circleID - The ID of the circle.
 * @param circleDateOfCreation - The date of creation of the circle.
 * @returns A promise that resolves to an array of customer objects.
 */
interface CircleDetails {
  circleID: string;
  circleDateOfCreation: string;
  today: string;
  cityID?: String;
}

export const getModifiedCustomers = async ({
  circleID,
  circleDateOfCreation,
  cityID,
  today,
}: CircleDetails): Promise<modifiedCustomer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result: GraphQLResult<any> = await client.graphql({
    //! This Custom query to fetch's Both CUSTOMERS and THEIR LOANS using circleDetails.
    query: `
      query ModifiedCustomer(
        $circleID: ID!,
        $circleDateOfCreation: ModelStringKeyConditionInput!,
        $limit: Int!,
        $filter: ModelCustomerFilterInput,
        $loanFilter: ModelLoanFilterInput
      ) {
        byCircleCustomer(
          circleID: $circleID,
          circleDateOfCreation: $circleDateOfCreation,
          limit: $limit,
          filter: $filter
        ) {
          items {
            adminID
            city {
              id
              name
            }
            customers {
              address
              customerName
              phone
              uId
            }
            documents {
              emptyCheque
              promissoryNote
            }
            id
            installmentPaymentInfo {
              paidDate
            }
            oldLoanInfo {
              closedDate
            }
            loans(filter: $loanFilter) {
              items {
                collectibleAmount
                dateOfCreation
                endDate
                id
                installmentType
                loanSerial
                nextDueDate
                paidAmount
                paidInstallments
                status
                totalInstallments
              }
            }
          }
        }
      }
    `,
    variables: {
      circleID: circleID,
      circleDateOfCreation: { eq: circleDateOfCreation },
      limit: 15000,
      filter: { cityID: { eq: cityID } },
      loanFilter: {
        or: [
          { status: { eq: "ACTIVE" } },
          { status: { eq: "UNDERREVIEW" } },
          {
            and: [{ status: { eq: "CLOSED" } }, { endDate: { eq: today } }],
          },
        ],
      },
    },
  });
  if (result.errors) {
    console.error(`***${result.errors}***`);
    throw new Error(
      `Failed to fetch customers ${JSON.stringify(result.errors)}`
    );
  }
  const customers = result.data.byCircleCustomer.items as modifiedCustomer[];
  return customers;
};

export default async function getSimplifiedCustomers({
  circleID,
  circleDateOfCreation,
  cityID,
  today,
}: CircleDetails): Promise<SimplifiedCustomer[]> {
  const noLoans: SimplifiedCustomer[] = [];
  const underReviewLoans: SimplifiedCustomer[] = [];
  const activeLoans: SimplifiedCustomer[] = [];
  const closedloans: SimplifiedCustomer[] = [];
  const customers = await getModifiedCustomers({
    circleID,
    circleDateOfCreation,
    cityID,
    today,
  });
  customers.map((c) => {
    if (c.loans?.items.length === 0) {
      noLoans.push({
        id: c.id,
        adminID: c.adminID,
        cityId: c.city?.id || "",
        cityName: c.city?.name || "",
        customerName: c.customers[0].customerName,
        customerPhone: c.customers[0].phone,
        customeruId: c.customers[0].uId,
        customerAddress: c.customers[0].address,
        emptyCheque: c.documents?.emptyCheque || null,
        promissoryNote: c.documents?.promissoryNote || null,
        NoLoan: true,
      });
    } else {
      c.loans?.items.map((l) => {
        if (l.status === "ACTIVE") {
          activeLoans.push({
            id: c.id,
            adminID: c.adminID,
            cityId: c.city?.id || "",
            cityName: c.city?.name || "",
            customerName: c.customers[0].customerName,
            customerPhone: c.customers[0].phone,
            customeruId: c.customers[0].uId,
            customerAddress: c.customers[0].address,
            emptyCheque: c.documents?.emptyCheque || null,
            promissoryNote: c.documents?.promissoryNote || null,
            lastInstallmentPaidDate: c.installmentPaymentInfo?.paidDate,
            oldLoanClosingDate: c.oldLoanInfo?.closedDate,
            collectibleAmount: l.collectibleAmount,
            dateOfCreation: l.dateOfCreation,
            loanId: l.id,
            installmentType: l.installmentType,
            endDate: l.endDate,
            loanSerial: l.loanSerial,
            nextDueDate: l.nextDueDate,
            paidAmount: l.paidAmount,
            paidInstallments: l.paidInstallments,
            totalInstallments: l.totalInstallments,
            status: l.status,
            NoLoan: false,
          });
        } else if (l.status === "UNDERREVIEW") {
          underReviewLoans.push({
            id: c.id,
            adminID: c.adminID,
            cityId: c.city?.id || "",
            cityName: c.city?.name || "",
            customerName: c.customers[0].customerName,
            customerPhone: c.customers[0].phone,
            customeruId: c.customers[0].uId,
            customerAddress: c.customers[0].address,
            emptyCheque: c.documents?.emptyCheque || null,
            promissoryNote: c.documents?.promissoryNote || null,
            lastInstallmentPaidDate: c.installmentPaymentInfo?.paidDate,
            oldLoanClosingDate: c.oldLoanInfo?.closedDate,
            collectibleAmount: l.collectibleAmount,
            dateOfCreation: l.dateOfCreation,
            loanId: l.id,
            installmentType: l.installmentType,
            endDate: l.endDate,
            loanSerial: l.loanSerial,
            nextDueDate: l.nextDueDate,
            paidAmount: l.paidAmount,
            paidInstallments: l.paidInstallments,
            totalInstallments: l.totalInstallments,
            status: l.status,
            NoLoan: false,
          });
        } else {
          closedloans.push({
            id: c.id,
            adminID: c.adminID,
            cityId: c.city?.id || "",
            cityName: c.city?.name || "",
            customerName: c.customers[0].customerName,
            customerPhone: c.customers[0].phone,
            customeruId: c.customers[0].uId,
            customerAddress: c.customers[0].address,
            lastInstallmentPaidDate: c.installmentPaymentInfo?.paidDate,
            oldLoanClosingDate: c.oldLoanInfo?.closedDate,
            collectibleAmount: l.collectibleAmount,
            dateOfCreation: l.dateOfCreation,
            loanId: l.id,
            endDate: l.endDate,
            loanSerial: l.loanSerial,
            nextDueDate: l.nextDueDate,
            paidAmount: l.paidAmount,
            paidInstallments: l.paidInstallments,
            totalInstallments: l.totalInstallments,
            status: l.status,
            NoLoan: false,
          });
        }
      });
    }
  });
  activeLoans.sort((a, b) => {
    const numA = Number(a.loanSerial);
    const numB = Number(b.loanSerial);

    if (isNaN(numA)) return 1; // Push NaN values to the end
    if (isNaN(numB)) return -1; // Push valid numbers before NaNs

    return numA - numB; // Normal numeric sorting
  });

  closedloans.sort((a, b) => {
    if (a.loanSerial && b.loanSerial) {
      return a.loanSerial.localeCompare(b.loanSerial);
    }
    return 0;
  });
  return [...underReviewLoans, ...closedloans, ...activeLoans, ...noLoans];
}

type CreateCustomerAndLoanProps = {
  customerInput: CreateCustomerInput;
  loanInput: CreateLoanInput;
  installmentInput: CreateInstallmentInput | null;
  transactionInput: CreateTransactionInput;
};

async function executeGraphQLMutation(query: string, variables: any) {
  const result: GraphQLResult<any> = await client.graphql({ query, variables });
  if (result.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
  }
  return result;
}

export async function addCustomerAndLoanDetails({
  customerInput,
  installmentInput,
  loanInput,
  transactionInput,
}: CreateCustomerAndLoanProps): Promise<SimplifiedCustomer> {
  try {
    const query =
      installmentInput === null
        ? `mutation CreateCustomerAndLoan(
          $customerInput: CreateCustomerInput!, 
          $loanInput: CreateLoanInput!, 
          $transactionInput: CreateTransactionInput!,
        ){
          createTransaction(input: $transactionInput) {
            id
          }
          createCustomer(input: $customerInput) {
          adminID
            city {
              id
              name
            }
            customers {
              address
              customerName
              phone
              uId
            }
            id
            installmentPaymentInfo {
              paidDate
              }
            oldLoanInfo {
              closedDate
            }
          }
          createLoan(input: $loanInput) {
            collectibleAmount
            dateOfCreation
            endDate
            id
            loanSerial
            nextDueDate
            paidAmount
            paidInstallments
            status
            totalInstallments
          }
        }`
        : `mutation CreateCustomerAndLoan(
          $customerInput: CreateCustomerInput!, 
          $loanInput: CreateLoanInput!, 
          $transactionInput: CreateTransactionInput!,
          $installmentInput: CreateInstallmentInput!
        ){
          createTransaction(input: $transactionInput) {
            id
          }
          createCustomer(input: $customerInput) {
            adminID
            city {
              id
              name
            }
            customers {
              address
              customerName
              phone
              uId
            }
            id
            installmentPaymentInfo {
              paidDate
              }
            oldLoanInfo {
              closedDate
            }
          }
          createLoan(input: $loanInput) {
            collectibleAmount
            dateOfCreation
            endDate
            id
            loanSerial
            nextDueDate
            paidAmount
            paidInstallments
            status
            totalInstallments
          }
          createInstallment(input: $installmentInput) {
            id
          }
        }`;

    const variables = {
      customerInput,
      loanInput,
      transactionInput,
      ...(installmentInput && { installmentInput }),
    };

    const result = await executeGraphQLMutation(query, variables);
    const customer = result.data.createCustomer;
    const loan = result.data.createLoan;
    const simplifiedCustomer: SimplifiedCustomer = {
      id: customer.id,
      adminID: customer.adminID,
      cityId: customer.city?.id || "",
      cityName: customer.city?.name || "",
      customerName: customer.customers[0].customerName,
      customerPhone: customer.customers[0].phone,
      customeruId: customer.customers[0].uId,
      customerAddress: customer.customers[0].address,
      lastInstallmentPaidDate: customer.installmentPaymentInfo?.paidDate,
      oldLoanClosingDate: customer.oldLoanInfo?.closedDate,
      loanId: loan.id,
      collectibleAmount: loan.collectibleAmount,
      dateOfCreation: loan.dateOfCreation,
      endDate: loan.endDate,
      loanSerial: loan.loanSerial,
      nextDueDate: loan.nextDueDate,
      paidAmount: loan.paidAmount,
      paidInstallments: loan.paidInstallments,
      totalInstallments: loan.totalInstallments,
      status: loan.status,
      NoLoan: false,
    };
    return simplifiedCustomer;
  } catch (error) {
    console.error(`***${error}***`, JSON.stringify(error));
    throw new Error(`Failed to create customer and loan ${error}`);
  }
}

export async function loadCustomerLoanSerial({
  id,
  adminID,
}: {
  id: string;
  adminID: string;
}): Promise<string[]> {
  const result: GraphQLResult<any> = await client.graphql({
    query: `query GetCustomer($adminID: String!, $id: ID!) {
      getCustomer(adminID: $adminID, id: $id) {
        loanSerial
      }
    }`,
    variables: { id, adminID },
  });
  if (result.errors) {
    console.error(`***${result.errors}***`);
    throw new Error(
      `Failed to fetch customer ${JSON.stringify(result.errors)}`
    );
  }
  return result.data.getCustomer.loanSerial;
}

type createLoanWithInstallmentsProps = {
  adminId: string;
  circleId: string;
  circleName: string;
  circleDateofCreation: string;
  dateTime: string;
  customerJson: string;
  loanJson: string;
  installmentsJson: string;
  agentDetails: string;
};

export async function createCustomerLoanWithInstallments({
  loanJson,
  installmentsJson,
  dateTime,
  customerJson,
  circleName,
  circleId,
  circleDateofCreation,
  agentDetails,
  adminId,
}: createLoanWithInstallmentsProps): Promise<boolean> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `
      mutation MyMutation(
        $loanJson: AWSJSON!, 
        $installmentsJson: AWSJSON!, 
        $dateTime: AWSDateTime!, 
        $customerJson: AWSJSON!, 
        $circleName: String!, 
        $circleId: String!, 
        $circleDateofCreation: AWSDate!, 
        $agentDetails: AWSJSON!, 
        $adminId: String!
      ) {
        createCustomerLoanWithInstallments(
          adminId: $adminId, 
          agentDetails: $agentDetails, 
          circleDateofCreation: $circleDateofCreation, 
          circleId: $circleId, 
          circleName: $circleName, 
          customerJson: $customerJson, 
          dateTime: $dateTime, 
          installmentsJson: $installmentsJson, 
          loanJson: $loanJson
        )
      }
    `,
      variables: {
        loanJson,
        installmentsJson,
        dateTime,
        customerJson,
        circleName,
        circleId,
        circleDateofCreation,
        agentDetails,
        adminId,
      },
    });
    if (result.errors) {
      console.error(`***${result.errors}***`);
      throw new Error(
        `Failed to create loan with installments ${JSON.stringify(
          result.errors
        )}`
      );
    }
    return true;
  } catch (error) {
    console.error(`***${error}***`, JSON.stringify(error));
    throw new Error(`Failed to create loan with installments ${error}`);
  }
}

interface CreateNewOrExistingCustomerProps {
  adminId: string;
  circleId: string;
  circleDateofCreation: string;
  dateTime: string;
  isNewCustomer: boolean;
  agentDetails: string;
  customerJson: string;
  loanJson: string;
  loanTransactionJson: string;
  loanSerialNumberJson: string;
  installmentJson: string | null;
}

export async function createNewOrExistingCustomer({
  ...p
}: CreateNewOrExistingCustomerProps): Promise<boolean> {
  try {
    await client.graphql({
      query: `
      mutation MyMutation(
        $loanTransactionJson: AWSJSON!, 
        $loanSerialNumberJson: AWSJSON!, 
        $loanJson: AWSJSON!, 
        $isNewCustomer: Boolean!, 
        $installmentJson: AWSJSON, 
        $dateTime: AWSDateTime!, 
        $customerJson: AWSJSON!, 
        $circleId: String!, 
        $circleDateofCreation: AWSDate!, 
        $agentDetails: AWSJSON!, 
        $adminId: String!
      ) {
        customerLoanCreation(
        adminId: $adminId, 
        agentDetails: $agentDetails, 
        circleDateofCreation: $circleDateofCreation, 
        circleId: $circleId, 
        customerJson: $customerJson, 
        dateTime: $dateTime, 
        isNewCustomer: $isNewCustomer, 
        loanJson: $loanJson, 
        loanSerialNumberJson: $loanSerialNumberJson, 
        loanTransactionJson: $loanTransactionJson, 
        installmentJson: $installmentJson
        )
      }
      `,
      variables: {
        ...p,
      },
    });
    return true;
  } catch (error) {
    console.error(`***${error}***`, JSON.stringify(error, null, 2));
    throw new Error(`Failed to create loan with installments ${error}`);
  }
}

export async function modifyCustomer({
  updatedCustomer,
}: {
  updatedCustomer: UpdateCustomerInput;
}): Promise<Customer> {
  try {
    const { data, errors } = await client.graphql({
      query: updateCustomer,
      variables: {
        input: updatedCustomer,
      },
    });
    if (errors) {
      console.error(`***${errors}***`);
      throw new Error(`Failed to update customer ${JSON.stringify(errors)}`);
    }
    return data.updateCustomer as Customer;
  } catch (error) {
    console.error(`***${error}***`, JSON.stringify(error, null, 2));
    throw new Error(`Failed to create loan with installments ${error}`);
  }
}

export async function getCustomerData({
  customerId,
  adminId,
}: {
  customerId: string;
  adminId: string;
}): Promise<Customer> {
  try {
    const { data, errors } = await client.graphql({
      query: getCustomer,
      variables: { id: customerId, adminID: adminId },
    });
    if (errors) {
      console.error(`***${errors}***`);
      throw new Error(`Failed to fetch customer ${JSON.stringify(errors)}`);
    }
    // Add null check
    if (!data?.getCustomer) {
      throw new Error(`No customer found with ID ${customerId}`);
    }
    return data.getCustomer as Customer;
  } catch (error) {
    console.error(`***${error}***`, JSON.stringify(error, null, 2));
    throw new Error(`Failed to create loan with installments ${error}`);
  }
}

/**
 * Props for retrieving complete financial data
 */
interface CompleteFinanceBookDataProps {
  circleID: string;
  circleDateOfCreation: string;
  today: string;
  paidDate: string;
  installmentType: InstallmentType;
}

/**
 * Retrieves complete financial data for a circle with filtering by installment type and date
 * @returns Promise<FinancialItem[]> Array of financial items with customer and loan data
 */
export async function getCompleteFinanceBookData({
  circleID,
  circleDateOfCreation,
  today,
  paidDate,
  installmentType,
}: CompleteFinanceBookDataProps): Promise<FinanceBook[]> {
  try {
    // Array to hold all items from multiple paginated requests
    const allItems: FinancialItem[] = [];
    let nextToken: string | null = null;

    // Continue fetching while there are more pages (nextToken exists)
    do {
      const result: GraphQLResult<any> = await client.graphql({
        query: `
          query GetFinancialItems(
            $circleID: ID!, 
            $circleDateOfCreation: ModelStringKeyConditionInput!, 
            $customerLimit: Int, 
            $installmentLimit: Int, 
            $installmentFilter: ModelInstallmentFilterInput!, 
            $loansFilter: ModelLoanFilterInput!,
            $nextToken: String
          ) {
            byCircleCustomer(
              circleID: $circleID
              circleDateOfCreation: $circleDateOfCreation
              limit: $customerLimit
              nextToken: $nextToken
            ) {
              items {
                id
                cityID
                customers {
                  customerName
                }
                loans(filter: $loansFilter) {
                  items {
                    id
                    collectibleAmount
                    dateOfCreation
                    loanSerial
                    paidAmount
                    installmentType
                    status
                    installments(limit: $installmentLimit, filter: $installmentFilter) {
                      items {
                        paidDate
                        paidAmount
                      }
                    }
                  }
                }
              }
              nextToken
            }
          }
        `,
        variables: {
          circleID,
          circleDateOfCreation: { eq: circleDateOfCreation },
          customerLimit: 15000,
          installmentLimit: 300,
          installmentFilter: {
            paidDate: { ge: paidDate },
          },
          loansFilter: {
            installmentType: { eq: installmentType },
            or: [
              { status: { eq: "ACTIVE" } },
              { status: { eq: "UNDERREVIEW" } },
              {
                and: [{ status: { eq: "CLOSED" } }, { endDate: { eq: today } }],
              },
            ],
          },
          nextToken: nextToken,
        },
      });

      if (result.errors) {
        console.error("GraphQL query errors:", result.errors);
        throw new Error(
          `Failed to fetch financial data: ${JSON.stringify(
            result.errors,
            null,
            2
          )}`
        );
      }

      // Add items from the current page to our collection
      if (result.data?.byCircleCustomer?.items) {
        allItems.push(
          ...(result.data.byCircleCustomer.items as FinancialItem[])
        );
      }

      // Update nextToken for the next iteration
      nextToken = result.data?.byCircleCustomer?.nextToken || null;
    } while (nextToken); // Continue while we have a nextToken

    // Process all collected items
    return buildFinanceBookEntries({ items: allItems });
  } catch (error) {
    console.error(`Error in getCompleteFinanceBookData:`, error);
    throw new Error(`Failed to retrieve finance book data: ${error}`);
  }
}

export function buildFinanceBookEntries({
  items,
}: {
  items: FinancialItem[];
}): FinanceBook[] {
  const financeBookEntries: FinanceBook[] = [];
  items.map((item) => {
    item.loans.items.map((loan) => {
      financeBookEntries.push({
        customerId: item.id,
        cityID: item.cityID,
        customerName: item.customers[0].customerName,
        loanId: loan.id,
        collectiableAmount: loan.collectibleAmount,
        dateOfCreation: loan.dateOfCreation,
        loanSerial: loan.loanSerial,
        paidAmount: loan.paidAmount,
        installmentType: loan.installmentType,
        status: loan.status,
        installments: loan.installments.items.map((installment) => ({
          paidDate: installment.paidDate,
          paidAmount: installment.paidAmount,
        })),
      });
    });
  });
  // Sort the finance book entries by loanSerial
  financeBookEntries.sort((a, b) => {
    const numA = Number(a.loanSerial);
    const numB = Number(b.loanSerial);

    if (isNaN(numA)) return 1; // Push NaN values to the end
    if (isNaN(numB)) return -1; // Push valid numbers before NaNs

    return numA - numB; // Normal numeric sorting
  });

  return financeBookEntries;
}
