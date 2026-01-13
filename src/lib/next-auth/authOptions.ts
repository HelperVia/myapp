import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserLoginType, TokenLoginType } from "@/types/auth/login.type";
import { Login } from "@app/api/auth/login/login";
import { ApiResponse } from "@/shared/lib/api/response/api.response.client";
import { createAuthCookies } from "@/shared/utils/next-auth/cookie";
import { YES, NO } from "@shared/constants/YesNo";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as UserLoginType;
        const response = await Login({ email: email, password: password });
        const data = await ApiResponse<{
          id: string;
          email: string;
          fullname: string;
          accessToken: string;
          emailVerify: typeof YES | typeof NO;
        }>(response);
        if (!response.ok || !data.ok) {
          throw new Error(data.error as string);
        }

        return {
          id: data.data?.id ?? "",
          email: data.data?.email ?? undefined,
          name: data.data?.fullname ?? undefined,
          accessToken: data.data?.accessToken ?? undefined,
          emailVerify: data.data?.emailVerify ?? undefined,
        };
      },
    }),
    CredentialsProvider({
      id: "token",
      name: "Token",
      credentials: {
        data: { label: "Data", type: "text" },
      },
      async authorize(credentials) {
        console.log("authorize called! credentials:", credentials);
        if (!credentials?.data) return null;

        const data = JSON.parse(credentials.data as string);
        console.log(data);
        if (!data?.id) return null;

        return {
          id: data.id,
          email: data.email,
          name: data.fullname,
          accessToken: data.accessToken,
          emailVerify: data.emailVerify,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 0,
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  cookies: createAuthCookies(),
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.emailVerify = user.emailVerify;
      }

      if (trigger === "update" && session?.licenseNumber) {
        token.licenseNumber = session.licenseNumber;
      }
      if (trigger === "update" && session?.emailVerify) {
        token.emailVerify = session.emailVerify;
      }

      return token;
    },
    async session({ session, token, trigger }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.accessToken = token.accessToken as string;
      session.licenseNumber = token.licenseNumber || undefined;
      session.emailVerify = token.emailVerify || undefined;

      if (trigger === "update" && token?.licenseNumber) {
        session.licenseNumber = token.licenseNumber;
      }
      if (trigger === "update" && token?.emailVerify) {
        session.emailVerify = token.emailVerify;
      }

      return session;
    },
  },
};
