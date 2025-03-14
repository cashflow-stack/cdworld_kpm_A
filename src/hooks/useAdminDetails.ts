import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function useAdminDetails() {
    const { user } = useAuthenticator((context) => [context.user]);
    if (!user) {
        throw new Error('User not found');
    }
    return { userID: user.userId, email: user.signInDetails?.loginId! }
}

export async function getAccessToken() {
    const session = await fetchAuthSession();
    return session.tokens?.idToken;
}