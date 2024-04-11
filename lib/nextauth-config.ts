// src/nextauth/nextauth-config.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../lib/auth';
import { createUser, findUserByEmail, updateLastLoginAt } from '../prisma/services/user';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        console.log(credentials)
        let user = await findUserByEmail(email);
        if (!user) {
          user = await createUser({
            email,
            password
          });
          console.log(user)
        }
        else {
          const passwordIsValid = await verifyPassword(password, user.password);
          if (!passwordIsValid) {
            throw new Error("Credentials are incorrect");
          }
          else {
            await updateLastLoginAt(email);
          }
        }
        return {
          id: user.id.toString(),
          email: user.email
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Specify your custom sign-in page path
    error: '', // Specify your error page path
  },
  // callbacks: {
  //   jwt: async ({ user, token }: any) => {
  //     if (user) {
  //       token.uid = user.id;
  //     }
  //     return token;
  //   },
  //   session: ({ session, token, user }: any) => {
  //     if (session.user) {
  //       session.user.id = token.uid
  //     }
  //     return session
  //   }
  // },
};

export default nextAuthOptions;
