/**
 * * Add Member to Existing Circle.
 * * scenario 1: The end user wants to add a new member to an existing circle.
 *      todo: 1. Create a member in a Cognito user pool using a custom query.
 *      todo: 2. With the user pool result, create a new member in the database.
 *      todo: 3. Assign a many-to-many relationship between circle and member in the circleMembers table.
 *      ! Must provide the "adminId," "adminEmail," "memberEmail," "memberPhone," and "memberRole."
 *
 * * scenario 2: The end user wants to link an existing member with an existing circle.
 *      todo: 1. Assign a many-to-many relationship between circle and member in the circleMembers table.
 *      todo: 2. Return the created circle result.
 *      ! Must provide the existing "memberId."
 */

import { Member, MemberRole } from "@/models/API";
import { addCircleMember } from "../circleMemberApi";
import { createMemberInUserPool } from "../createMemberInUserPool";
import { addMember } from "../membersApi";

/**
 * *🔥Adds a member to an existing circle.
 * @param adminId - The ID of the admin.
 * @param adminEmail - The email of the admin.
 * @param circleid - The ID of the circle.
 * @param circleDateOfcreation - The date of creation of the circle.
 * @param memberId - The ID of the member.
 * @param memberName - The name of the member.
 * @param memberEmail - The email of the member.
 * @param memberPhone - The phone number of the member.
 * @param memberRole - The role of the member.
 * @returns A promise that resolves to an object containing the circle ID and member ID.
 * @throws If there is an error creating the member circle assignment.
 */

interface MemberCircleAssignmentInput {
  adminId?: string;
  adminEmail?: string;
  circleid: string;
  circleDateOfcreation: string;
  member?: Member;
  memberName?: string;
  memberEmail?: string;
  memberPhone?: string;
  memberRole?: MemberRole;
}

export async function addMemberToExistingCircle({
  adminId,
  adminEmail,
  circleid,
  circleDateOfcreation,
  member,
  memberName,
  memberEmail,
  memberPhone,
  memberRole,
}: MemberCircleAssignmentInput): Promise<Member> {
  //! If there is already an existing member
  try {
    if (member) {
      //# Assign a many-to-many relationship between circle and member in the circleMembers table
      return await assignMemberToCircle(circleid, member, circleDateOfcreation);
    } else {
      //* Ensure required fields are provided for a new member
      if (
        !adminId ||
        !adminEmail ||
        !memberEmail ||
        !memberPhone ||
        !memberRole ||
        !memberName
      ) {
        throw new Error("Missing required member information.");
      }
      //! 1.Create a member in a cognito user pool using custom query
      const newCognitoMemberResult = await createMemberInUserPool({
        memberEmail,
        memberName,
        memberPhone,
        memberRole,
      });

      //! 2.With user pool result create a new member in the database
      const member = await addMember({
        id: newCognitoMemberResult.User.Username,
        adminEmail,
        adminId,
        name: memberName,
        phoneNumber: memberPhone,
        email: memberEmail,
        memberRole,
      });
      //# Assign a many-to-many relationship between circle and member in the circleMembers table
      return await assignMemberToCircle(circleid, member, circleDateOfcreation);
    }
  } catch (error) {
    console.error(
      `Error creating member circle assignment: ${JSON.stringify(error)}`
    );
    throw new Error(
      `Error creating member circle assignment: ${JSON.stringify(error)}`
    );
  }
}

async function assignMemberToCircle(
  circleid: string,
  member: Member,
  circleDateOfcreation: string
): Promise<Member> {
  //! 1. Assign a many-to-many relationship between circle and member in the circleMembers table.
  await addCircleMember({
    circleId: circleid,
    circleDateOfCreation: circleDateOfcreation,
    memberId: member.id,
    memberName: member.name,
  });
  return member;
}
