import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByEmail, getShop, updateLastLoginAt } from "../../prisma/services/user";
import { verifyPassword } from "../../lib/auth";

declare module "next-auth" {
    interface Session {
        user: {
            shopDomain: string | null
        } & DefaultSession["user"]
    }
}


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
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
            return {
                ...session,
                user: {
                    ...session.user,
                    shopDomain: token.shopDomain
                }
            }
        }
    },
})
