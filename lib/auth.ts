import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {

                return {
                    id: "user1"
                };
            },
        })
    ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    pages: {
        signIn: '/',
    },
};