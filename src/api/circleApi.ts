import { GraphQLResult } from "aws-amplify/api";
import { byAdminCircles } from "@/models/queries";
import { client } from "./queryProvider";
import {
  Circle,
  ClosingSnapshotInput,
  CreateCashAccountInput,
  CreateCircleInput,
  CreateCityInput,
  CreateCMSSubscriptionInput,
  CreateLoanSerialNumberInput,
  UpdateCircleInput,
  UpdateCityInput,
  Weekday,
} from "@/models/API";
import { v4 as uuidv4 } from "uuid";
import { SimplifiedTransaction } from "@/models/customModels/customModels";

/**
 * *🔥Retrieves a list of circles for a given admin.
 * @param adminId - The ID of the admin.
 * @param adminEmailId - The email ID of the admin.
 * @returns A promise that resolves to an array of Circle objects.
 */
interface AdminDetails {
  adminId: string;
  adminEmailId: string;
}

export async function getCircles({
  adminId,
  adminEmailId,
}: AdminDetails): Promise<Circle[]> {
  try {
    const { data, errors } = await client.graphql({
      query: byAdminCircles,
      variables: {
        adminID: adminId,
        adminEmailId: { eq: adminEmailId },
        limit: 15000,
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(`Failed to get circles ${errors}`);
    }
    const circles: Circle[] = data.byAdminCircles.items;
    return circles;
  } catch (error: any) {
    console.error("Error fetching circles:", error);
    throw new Error(`Failed to get circles: ${error.message}`);
  }
}

/**
 * 🔥Retrieves circles by member details.
 * @param memberDetails - The member details object.
 * @param memberDetails.memberID - The ID of the member.
 * @param memberDetails.memberName - The name of the member.
 * @returns A promise that resolves to an array of Circle objects.
 * @throws If there is an error retrieving the circles.
 */
interface memberDetails {
  memberID: string;
  memberName: string;
}

export async function getCirclesByMember({
  memberID,
  memberName,
}: memberDetails): Promise<Circle[]> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `query MyQuery($memberName: ModelStringKeyConditionInput!, $memberID: ID!, $limit: Int!) {
                byMemberCircle(memberID: $memberID, memberName: $memberName, limit: $limit) {
                    items {
                        circle {
                            __typename
                            adminEmailId
                            adminID
                            circleName
                            createdAt
                            dateOfCreation
                            day
                            id
                            updatedAt
                        }
                    }
                }
            }`,
      variables: {
        memberID: memberID,
        memberName: { eq: memberName },
        limit: 15000,
      },
    });

    if (result.errors) {
      console.error("GraphQL errors:", JSON.stringify(result.errors));
      throw new Error(
        `Failed to get circles: ${JSON.stringify(result.errors)}`
      );
    }

    const circles: Circle[] = result.data.byMemberCircle.items.map(
      (item: any) => item.circle
    );
    return circles;
  } catch (error: any) {
    console.error("Error fetching circles:", error);
    throw new Error(`Failed to get circles: ${error.message}`);
  }
}

/**
 * *🔥Adds a new circle to the CircleTable.
 * @param circleName - The name of the circle.
 * @param dateOfCreation - The date of creation for the circle.
 * @param day - The day associated with the circle.
 * @param adminEmailId - The email ID of the circle admin.
 * @param adminID - The ID of the circle admin.
 * @returns A Promise that resolves to the created Circle object.
 * @throws An error if the circle creation fails.
 */
interface NewCircleDetails {
  adminEmailId: string;
  adminID: string;
  circleName: string;
  lastClosingEntryDate: string;
  dateOfCreation: string;
  day: Weekday;
}

export async function addCircle({
  circleName,
  dateOfCreation,
  lastClosingEntryDate,
  day,
  adminEmailId,
  adminID,
}: NewCircleDetails): Promise<Circle> {
  // making circle first letter captial
  circleName = circleName.charAt(0).toUpperCase() + circleName.slice(1);
  // create a dummy object for the circle
  const dummyObject: SimplifiedTransaction[] = [];
  const jsonDummyObject = JSON.stringify(dummyObject);
  const closingSnapshot: ClosingSnapshotInput = {
    chits: 0,
    deficit: 0,
    excessCollection: 0,
    interest: 0,
    investments: 0,
    loansGiven: 0,
    incomes: 0,
    expenses: 0,
    repayments: 0,
    withdrawals: 0,
  };

  const circleId = uuidv4();
  const circle: CreateCircleInput = {
    id: circleId,
    adminEmailId: adminEmailId,
    adminID: adminID,
    circleName: circleName,
    dateOfCreation: dateOfCreation,
    day: day,
  };
  const city: CreateCityInput = {
    id: circleId,
    name: circleName,
    circleDateOfCreation: dateOfCreation,
    adminID: adminID,
    circleID: circleId,
  };
  const subscription: CreateCMSSubscriptionInput = {
    id: circleId,
    amount: 0,
    circleID: circleId,
    circleDateOfCreation: dateOfCreation,
    adminID: adminID,
    isActive: true,
    startDate: dateOfCreation,
    endDate: dateOfCreation,
  };
  const loanSerialNumber: CreateLoanSerialNumberInput = {
    id: circleId,
    adminID: adminID,
    circleDateOfCreation: dateOfCreation,
    circleID: circleId,
    serialNumber: "1",
  };
  const cashAccount: CreateCashAccountInput = {
    adminEmailId: adminEmailId,
    adminID: adminID,
    cashflowIn: 0,
    cashflowOut: 0,
    circleID: circleId,
    closingBalance: 0,
    closingEntryDate: lastClosingEntryDate,
    description: "Initial Entry",
    simplifiedTransactions: jsonDummyObject,
    openingBalance: 0,
    openingEntryDate: lastClosingEntryDate,
    outstandingAmount: 0,
    closingSnapshot: closingSnapshot,
  };
  const cCircle = "createCircle";
  const cCity = "createCity";
  const cSubscription = "createCMSSubscription";
  const cLSNumber = "createLoanSerialNumber";
  const cCashAccount = "createCashAccount";
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `mutation CreateCircle(
      \$circleInput: CreateCircleInput!,
      \$cityInput: CreateCityInput!,
      \$subscriptionInput: CreateCMSSubscriptionInput!,
      \$loanSerialNumberInput: CreateLoanSerialNumberInput!
      \$cashAccountInput: CreateCashAccountInput!
      ){
          ${cCircle}(input: \$circleInput){
              circleName
              createdAt
              dateOfCreation
              day
              id
              updatedAt
          }
          ${cCity}(input: \$cityInput){
              id
          }
          ${cSubscription}(input: \$subscriptionInput){
              id
          }
          ${cLSNumber}(input: \$loanSerialNumberInput){
              id
          }
          ${cCashAccount}(input: \$cashAccountInput){
              id
          }
        }`,
      variables: {
        circleInput: circle,
        cityInput: city,
        subscriptionInput: subscription,
        loanSerialNumberInput: loanSerialNumber,
        cashAccountInput: cashAccount,
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(`Failed to add circle ${errors}`);
    }
    return data.createCircle;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw new Error(`Failed to add circle ${error}`);
  }
}

/**
 * *🔥Updates the circle details in the CircleTable.
 * @param circle - The updated Circle object.
 * @returns A Promise that resolves to the updated Circle object.
 * @throws An error if the circle update fails.
 */
interface CircleDetails {
  id: string;
  adminID: string;
  updatedName: string;
  dateOfCreation: string;
  updatedDay: Weekday;
}
export async function updateCircleDetails({
  id,
  dateOfCreation,
  adminID,
  updatedName,
  updatedDay,
}: CircleDetails): Promise<Circle> {
  const updatedCircle: UpdateCircleInput = {
    id: id,
    dateOfCreation: dateOfCreation,
    adminID: adminID,
    circleName: updatedName,
    day: updatedDay,
  };
  const updatedCity: UpdateCityInput = {
    id: id,
    adminID: adminID,
    name: updatedName,
  };
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `
      mutation UpdateCircleAndCity(
        $circleInput: UpdateCircleInput!, 
        $cityInput: UpdateCityInput!
      ) {
        updateCircle(input: $circleInput) {
        circleName
        id
        dateOfCreation
        day
        adminEmailId
        adminID
        createdAt
        updatedAt
        }
        updateCity(input: $cityInput) {
        id
        }
      }
      `,
      variables: {
        circleInput: updatedCircle,
        cityInput: updatedCity,
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(`Failed to update circle ${errors}`);
    }
    return data.updateCircle as Circle;

    /** result model
     * {
  "data": {
    "updateCircle": {
      "circleName": "Testing Circle Date",
      "id": "ee193a22-6042-4bd6-b1c6-b81783f86898",
      "dateOfCreation": "2025-03-17",
      "day": "TUESDAY",
      "adminEmailId": "arr9182@gmail.com",
      "adminID": "41135d8a-6071-70ab-fea8-2f7eb37c775e",
      "createdAt": "2025-03-17T15:31:08.571Z",
      "updatedAt": "2025-03-18T09:19:26.644Z"
    },
    "updateCity": {
      "id": "ee193a22-6042-4bd6-b1c6-b81783f86898"
    }
  }
}
     */
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update circle ${error}`);
  }
}

/**
 * to delete a circle the following steps are to be followed:
 * 1. check if there are any active Customers in the circle
 * 2. check if there are any cities in the circle
 * 3. if both the above conditions are false, then delete the balanceSnap, CMSSubscription, LoanSerialNumber and Circle
 */

interface DeletingCircleDetails {
  circleID: string;
  circleDateOfCreation: string;
  adminID: string;
}

export async function removeCircle({
  circleID,
  circleDateOfCreation,
  adminID,
}: DeletingCircleDetails) {
  //! check if there are any Customers in the circle
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `query GetCustomers($filter: ModelCustomerFilterInput!){
            listCustomers(filter: $filter, limit:10) {
                items {
                id
                }
              }
            }`,
      variables: {
        filter: {
          circleID: { eq: circleID },
          circleDateOfCreation: { eq: circleDateOfCreation },
        },
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(`Failed to get customers ${errors}`);
    }
    const customers = data.listCustomers.items;
    if (customers.length > 0) {
      throw new Error(
        "Inorder to delete the circle, all the customers should be deleted first"
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get customers ${error}`);
  }
  //! check if there are any cities in the circle
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `query GetCities($filter: ModelCityFilterInput!) {
                    listCities(filter: $filter, limit: 10) {
                        items {
                            id
                        }
                    }
                }`,
      variables: {
        filter: {
          circleID: { eq: circleID },
          circleDateOfCreation: { eq: circleDateOfCreation },
        },
      },
    });
    if (errors) {
      console.error(errors);
      throw new Error(`Failed to get cities ${errors}`);
    }
    const cities = data.listCities.items;
    if (cities.length > 0) {
      throw new Error(
        "Inorder to delete the circle, all the cities should be deleted first"
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get cities ${error}`);
  }
  // //! getting circle along with cmsSubscriptionId, LoanSerialNumberId.
  try {
    //   const { data, errors }: GraphQLResult<any> = await client.graphql({
    //     query: `query RetriveCircleDetails($dateOfCreation: AWSDate!, $id: ID!) {
    //                   getCircle(dateOfCreation: $dateOfCreation, id: $id) {
    //                       adminID

    //                       loanSerialNumber {
    //                           id
    //                       }
    //                       subscription {
    //                           id
    //                       }
    //                   }
    //               }`,
    //     variables: {
    //       dateOfCreation: circleDateOfCreation,
    //       id: circleID,
    //     },
    //   });
    //   if (errors) {
    //     console.error(errors);
    //     throw new Error(`Failed to get circle details ${errors}`);
    //   }
    // const circleDetails = data.getCircle;

    //! delete the circle along with balancesnapId, cmsSubscriptionId, LoanSerialNumberId.
    const { data: deleteData, errors: deleteError }: GraphQLResult<any> =
      await client.graphql({
        query: `mutation MyMutation($input1: DeleteCMSSubscriptionInput!, $input2: DeleteCircleInput!, $input3: DeleteLoanSerialNumberInput!) {
                deleteCMSSubscription(input: $input1){
                id
                }
                deleteCircle(input: $input2){
                id
                }
                deleteLoanSerialNumber(input: $input3){
                id
                }
            }`,
        variables: {
          input1: {
            adminID: adminID,
            id: circleID,
          },
          input2: {
            dateOfCreation: circleDateOfCreation,
            id: circleID,
          },
          input3: {
            adminID: adminID,
            id: circleID,
          },
        },
      });
    if (deleteError) {
      console.error(JSON.stringify(deleteError));
      throw new Error(JSON.stringify(deleteError));
    }
    return deleteData.deleteCircle;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw new Error(JSON.stringify(error));
  }
}

export async function lockCircle({
  updatedCircle,
}: {
  updatedCircle: UpdateCircleInput;
}): Promise<Boolean> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `mutation UpdateCircle($circleInput: UpdateCircleInput!){
              updateCircle(input: $circleInput){
                id
                dateOfCreation
                isLocked
              }
            }`,
      variables: { input: updatedCircle },
    });
    if (result.errors) {
      console.error(result.errors);
      throw new Error(`Failed to lock circle ${result.errors}`);
    }
    return true;
  } catch (error) {
    throw new Error(`Failed to lock circle ${error}`);
  }
}
