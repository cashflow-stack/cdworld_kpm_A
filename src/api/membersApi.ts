import { GraphQLResult } from "aws-amplify/api";
import { client } from "./queryProvider";
import { byAdminMembers, getMember } from "@/models/queries";
import {
  CreateMemberInput,
  Member,
  MemberRole,
  MemberStatus,
} from "@/models/API";

/**
 * *🔥Fetches members based on the provided query details.
 * @param {MemberQueryDetails} queryDetails - The query details containing adminId and adminEmail.
 * @returns {Promise<Member[]>} - A promise that resolves to an array of members.
 * @throws {Error} - If there is an error while fetching members.
 */
interface MemberQueryDetails {
  adminId: string;
  adminEmailId: string;
}
export async function fetchMembers({
  adminId,
  adminEmailId,
}: MemberQueryDetails): Promise<Member[]> {
  const { data, errors } = await client.graphql({
    query: byAdminMembers,
    variables: {
      adminID: adminId,
      adminEmailId: { eq: adminEmailId },
      limit: 15000,
    },
  });
  if (errors) {
    console.log(errors);
    throw new Error(`Failed to fetch members ${errors}`);
  }
  const members: Member[] = data.byAdminMembers.items;
  return members;
}

/**
 * *🔥Adds a new member to the MemberTable.
 * @param id - The ID of the new member.
 * @param adminEmail - The email of the admin who is adding the member.
 * @param adminId - The ID of the admin who is adding the member.
 * @param name - The name of the new member.
 * @param phoneNumber - The phone number of the new member.
 * @param email - The email of the new member.
 * @param memberRole - The role of the new member.
 * @param share - The share of the new member.
 * @returns A Promise that resolves to the newly created member.
 * @throws An error if the member creation fails.
 */
interface NewMemberDetails {
  id: string;
  adminId: string;
  adminEmail: string;
  name: string;
  phoneNumber: string;
  email: string;
  memberRole: MemberRole;
  share?: number;
}
export async function addMember({
  id,
  adminEmail,
  adminId,
  name,
  phoneNumber,
  email,
  memberRole,
}: NewMemberDetails): Promise<Member> {
  try {
    const member: CreateMemberInput = {
      id: id,
      adminEmailId: adminEmail,
      adminID: adminId,
      emailId: email,
      memberRole: memberRole,
      name: name,
      phoneNumber: phoneNumber,
      status: MemberStatus.ACTIVE,
    };
    const { errors, data }: GraphQLResult<any> = await client.graphql({
      query: `mutation MyMutation($input: CreateMemberInput!) {
                createMember(input: $input) {
                    adminEmailId
                    adminID
                    createdAt
                    emailId
                    id
                    memberRole
                    name
                    phoneNumber
                    status
                    updatedAt
                }
            }`,
      variables: { input: member },
    });
    if (errors) {
      console.log(errors[0].message);
      throw new Error(`Failed to add member ${errors[0].message}`);
    }
    return data.createMember;
  } catch (error) {
    throw new Error(`Failed to add member ${JSON.stringify(error)}`);
  }
}

export async function getMemberById({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<Member> {
  const { data, errors } = await client.graphql({
    query: getMember,
    variables: { id: id, name: name }, // Pass the id and name as variables
  });
  if (errors) {
    console.log(JSON.stringify(errors));
    throw new Error(`Failed to fetch member ${errors}`);
  }

  return data.getMember as Member;
}

//fetch members using circleId and circleDateOfCreation

export async function fetchMembersByCircle({
  circleId,
  circleDateOfCreation,
}: {
  circleId: string;
  circleDateOfCreation: string;
}): Promise<Member[]> {
  try {
    const result: GraphQLResult<any> = await client.graphql({
      query: `query MyQuery($circleDateOfCreation: ModelStringKeyConditionInput!, $circleID: ID!) {
          byCircleMember(circleID: $circleID, circleDateOfCreation: $circleDateOfCreation) {
              items {
                  member {
                      __typename
                      adminEmailId
                      adminID
                      createdAt
                      emailId
                      id
                      memberRole
                      name
                      phoneNumber
                      status
                      updatedAt
                  }
              }
          }
      }`,
      variables: {
        circleID: circleId,
        circleDateOfCreation: { eq: circleDateOfCreation },
      },
    });
    if (result.errors) {
      console.error(result.errors);
      throw new Error(`Failed to fetch members ${result.errors}`);
    }
    const members = result.data.byCircleMember.items.map(
      (item: any) => item.member
    );
    return members;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch members ${error}`);
  }
}
