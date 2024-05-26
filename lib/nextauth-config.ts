// src/nextauth/nextauth-config.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../lib/auth';
import { createUser, findUserByEmail, getShop, updateLastLoginAt } from '../prisma/services/user';

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
          throw new Error("User not found. Please do sign up first");
        }
        else {
          const passwordIsValid = await verifyPassword(password, user.password);
          if (!passwordIsValid) {
            throw new Error("Credentials are incorrect. Please try again with the correct credentials");
          }
          else {
            await updateLastLoginAt(email);
          }
        }
        let shop = await getShop(email);
        if (shop) {
          console.log("inside authh" + shop)
          return {
            id: user.id.toString(),
            email: user.email,
            shopDomain: shop
          };
        }
        else {
          console.log("inside authh without shop")
          return {
            id: user.id.toString(),
            email: user.email
          };
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Specify your custom sign-in page path
    error: '', // Specify your error page path
  },
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user && user.shopDomain) {
        token.shopDomain = user.shopDomain;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.shopDomain = token.shopDomain
      }
      return session
    }
  },
};

export default nextAuthOptions;
