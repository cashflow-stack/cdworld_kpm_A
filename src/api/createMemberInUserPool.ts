import { MemberRole } from "@/models/API";
import { GraphQLResult } from "aws-amplify/api";
import { client } from "./queryProvider";

interface CreateMemberInUserPoolInput {
    memberName: string;
    memberEmail: string;
    memberPhone: string;
    memberRole: MemberRole;
}

//! create a member in a cognito user pool using custom query
export async function createMemberInUserPool({ memberEmail, memberName, memberPhone, memberRole }: CreateMemberInUserPoolInput) {
    try {
        const { data, errors }: GraphQLResult<any> = await client.graphql({
            query: `mutation CognitoUserCreation(
                    $email: AWSEmail!
                    $memberRole: String!
                    $name: String!,
                    $phoneNumber: AWSPhone!
                ){
                    createUser(email: $email, memberRole: $memberRole, name: $name, phoneNumber: $phoneNumber)
                }`,
            variables: {
                email: memberEmail,
                memberRole: `${memberRole}S`,
                name: memberName,
                phoneNumber: memberPhone
            }
        });
        if (errors) {
            throw new Error(`Error creating member: ${JSON.stringify(errors[0].message)}`);
        }
        const result = JSON.parse(data.createUser);
        return result;
    } catch (error) {
        throw new Error(`Error creating member: ${JSON.stringify(error)}`);
    }
};