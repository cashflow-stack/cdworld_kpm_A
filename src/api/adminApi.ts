import { getAdmin } from "@/models/queries";
import { client } from "./queryProvider";
import { Admin } from "@/models/API";

/**
 * *🔥Retrieves admin data based on the provided "userID" and "email".
 * @param userID - The ID of the user.
 * @param email - The email of the user.
 * @returns A Promise that resolves to the admin data.
 * @throws If there is an error retrieving the admin data.
 */
interface LoginDetails {
    userID: string | undefined;
    email: string | undefined;
}

export const getOwner = async ({ userID, email }: LoginDetails): Promise<Admin> => {
    if (!userID || !email) {
        throw new Error('User ID and email are required to get admin data');
    }
    const { data, errors } = await client.graphql({
        query: getAdmin,
        variables: { 'id': userID, 'emailId': email }
    });
    if (errors) {
        console.error(`${errors}`);
        throw new Error(`Failed to get admin ${errors}`);
    }
    return data.getAdmin as Admin;
};