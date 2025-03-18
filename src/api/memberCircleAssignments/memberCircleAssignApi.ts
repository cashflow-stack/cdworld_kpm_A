// /**
//  * *Create a circle and assign it to a member.
//  * 
//  * todo: 1. Create a member in a Cognito user pool using a custom query.
//  * todo: 2. With the user pool result, create a new member in the database.
//  * todo: 3. Create a new circle in the database.
//  * todo: 4. Assign a many-to-many relationship between circle and member in the circleMembers table.
//  * todo: 5. Return the created circle result.
//  *
//  * ?If the end user selects an existing member, provide the existing "memberId" and skip steps 1 and 2.
//  * ?If the end user selects "skip," just create a circle from "circleApi.ts."
//  */

// import { Circle, MemberRole, Weekday } from "@/models/API";
// import { createMemberInUserPool } from "../createMemberInUserPool";
// import { addMember } from "../membersApi";
// import { addCircle } from "../circleApi";
// import { addCircleMember } from "../circleMemberApi";

// /**
//  * *🔥Creates a member circle assignment.
//  * @param adminId - The ID of the admin.
//  * @param adminEmail - The email of the admin.
//  * @param circleName - The name of the circle.
//  * @param day - The day of the circle.
//  * @param memberId - The ID of the member.
//  * @param memberName - The name of the member.
//  * @param memberEmail - The email of the member.
//  * @param memberPhone - The phone number of the member.
//  * @param memberRole - The role of the member.
//  * @returns A Promise that resolves to the created Circle.
//  * @throws If there is an error creating the member circle assignment.
//  */
// interface MemberCircleAssignmentInput {
//     adminId: string;
//     adminEmail: string;
//     circleName: string;
//     day: Weekday;
//     memberId?: string;
//     memberName: string;
//     memberEmail: string;
//     memberPhone: string;
//     memberRole: MemberRole;
// };

// interface CreateCircleAndAssignMemberInput {
//     adminId: string;
//     adminEmail: string;
//     circleName: string;
//     day: Weekday;
//     memberId: string;
//     memberName: string;
// };

// async function createCircleAndAssignMember({ adminId, adminEmail, circleName, day, memberId, memberName }: CreateCircleAndAssignMemberInput): Promise<Circle> {
//     //! 3.create a new circle in the database
//     const newCircleResult = await addCircle({
//         circleName,
//         dateOfCreation: `${new Date().toISOString()}`.split("T")[0],
//         day,
//         lastClosingEntryDate: `${new Date().toISOString()}`.split("T")[0],
//         adminEmailId: adminEmail,
//         adminID: adminId,
//     });
//     //! 4.assign the circle to the member
//     await addCircleMember({
//         circleId: newCircleResult.id,
//         circleDateOfCreation: newCircleResult.dateOfCreation,
//         memberId: memberId,
//         memberName: memberName,
//     });
//     //! 5.return created circle result
//     return newCircleResult;
// }

// export async function createMemberCircleAssignment({
//     adminId,
//     adminEmail,
//     circleName,
//     day,
//     memberId,
//     memberName,
//     memberEmail,
//     memberPhone,
//     memberRole
// }: MemberCircleAssignmentInput): Promise<Circle> {
//     try {
//         if (!memberId) {
//             //! 1.Create a member in a cognito user pool using custom query
//             const newCognitoMemberResult = await createMemberInUserPool({
//                 memberEmail,
//                 memberName,
//                 memberPhone,
//                 memberRole
//             });

//             //! 2.With user pool result create a new member in the database
//             await addMember({
//                 id: newCognitoMemberResult.User.Username,
//                 adminEmail: adminEmail,
//                 adminId: adminId,
//                 name: memberName,
//                 phoneNumber: memberPhone,
//                 email: memberEmail,
//                 memberRole,
//             });

//             //* Create a new circle and assign the circle to the member
//             return await createCircleAndAssignMember(
//                 {
//                     adminId,
//                     adminEmail,
//                     circleName,
//                     day,
//                     memberId: newCognitoMemberResult.User.Username,
//                     memberName
//                 }
//             );
//         } else {
//             //* Only Create a new circle and assign the circle to the existing member
//             return await createCircleAndAssignMember(
//                 {
//                     adminId,
//                     adminEmail,
//                     circleName,
//                     day,
//                     memberId,
//                     memberName
//                 }
//             );
//         }
//     } catch (error) {
//         console.error(`Error creating member circle assignment: ${JSON.stringify(error)}`);
//         throw new Error(`Error creating member circle assignment: ${JSON.stringify(error)}`);
//     }
// }

// // const newCognitoMemberMockResult = `{
// //     "$metadata": {
// //         "httpStatusCode": 200,
// //         "requestId": "732da03b-6307-4782-8882-712a5ce1e0cb",
// //         "attempts": 1,
// //         "totalRetryDelay": 0
// //     },
// //     "User": {
// //         "Attributes": [
// //             {
// //                 "Name": "email",
// //                 "Value": "suryabhaskarreddy@yahoo.in"
// //             },
// //             {
// //                 "Name": "email_verified",
// //                 "Value": "True"
// //             },
// //             {
// //                 "Name": "phone_number",
// //                 "Value": "+919492952532"
// //             },
// //             {
// //                 "Name": "phone_number_verified",
// //                 "Value": "True"
// //             },
// //             {
// //                 "Name": "name",
// //                 "Value": "suryaishnavi"
// //             },
// //             {
// //                 "Name": "sub",
// //                 "Value": "61d33d7a-d011-7019-369c-5132deb302f0"
// //             }
// //         ],
// //         "Enabled": true,
// //         "UserCreateDate": "2024-06-23T11:12:33.138Z",
// //         "UserLastModifiedDate": "2024-06-23T11:12:33.138Z",
// //         "UserStatus": "FORCE_CHANGE_PASSWORD",
// //         "Username": "61d33d7a-d011-7019-369c-5132deb302f0"
// //     }
// // }`;
