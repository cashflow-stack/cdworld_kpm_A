import { GraphQLResult } from "aws-amplify/api";
import { client } from "./queryProvider";

interface CircleMemberInput {
  circleId: string;
  circleDateOfCreation: string;
  memberId: string;
  memberName: string;
}
export async function addCircleMember({
  circleId,
  circleDateOfCreation,
  memberId,
  memberName,
}: CircleMemberInput) {
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `mutation CircleMemberMutation($input: CreateCircleMembersInput!) {
                createCircleMembers(input: $input){
                    circleId
                    memberId
                }
            }`,
      variables: {
        /* { 
                circleDateOfCreation: "2024-06-23", 
                circleID: "8819cb7c-1868-4f03-bf66-52a8f5b9c5a0", 
                circleId: "8819cb7c-1868-4f03-bf66-52a8f5b9c5a0", 
                memberID: "d1939dfa-4031-7068-3b93-273e417f1a25", 
                memberId: "d1939dfa-4031-7068-3b93-273e417f1a25", 
                memberName: "Surya Bhaskar Reddy" 
                } */
        input: {
          circleDateOfCreation,
          circleID: circleId,
          memberID: memberId,
          circleId,
          memberId,
          memberName,
        },
      },
    });
    if (errors) {
      throw new Error(`Error adding circle member: ${errors[0].message}`);
    }
    return data.createCircleMembers;
  } catch (error) {
    throw new Error(`Error adding circle member: ${JSON.stringify(error)}`);
  }
}

// remove a member from a circle which takes in the member id and circle id
export async function removeCircleMember({
  circleId,
  memberId,
}: {
  circleId: string;
  memberId: string;
}) {
  try {
    const { data, errors }: GraphQLResult<any> = await client.graphql({
      query: `
      mutation RemoveCircleMember($input: DeleteCircleMembersInput!) {
        deleteCircleMembers(input: $input) {
        circleId
        memberId
        }
      }
      `,
      variables: {
      input: {
        circleId,
        memberId,
      },
      },
    });
    if (errors) {
      throw new Error(`Error removing circle member: ${errors[0].message}`);
    }
    return data.removeCircleMembers;
  } catch (error) {
    throw new Error(`Error removing circle member: ${JSON.stringify(error)}`);
  }
}
