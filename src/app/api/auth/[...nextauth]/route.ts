import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserLoginType } from "@/types/auth/login.type";
import { Login } from "../login/login";
import { ApiResponse } from "@/shared/lib/api/response/api.response.client";
import { createAuthCookies } from "@/shared/utils/next-auth/cookie";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as UserLoginType;
        const response = await Login({ email: email, password: password });
        const data = await ApiResponse(response);
        if (!response.ok || !data.ok) {
          throw new Error(data.error as string);
        }

        return {
          id: data.data?.id ?? "",
          email: data.data?.email ?? undefined,
          name: data.data?.fullname ?? undefined,
          accessToken: data.data?.accessToken ?? undefined,
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
      }
      if (trigger === "update" && session?.accessToken) {
        token.accessToken = session.accessToken;
      }
      if (trigger === "update" && session?.licenseNumber) {
        token.licenseNumber = session.licenseNumber;
      }
      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }
      if (trigger === "update" && session?.id) {
        token.id = session.id;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },
    async session({ session, token, trigger }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.accessToken = token.accessToken as string;
      session.licenseNumber = token.licenseNumber || undefined;

      if (trigger === "update" && token?.licenseNumber) {
        session.licenseNumber = token.licenseNumber;
      }
      if (trigger === "update" && token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (trigger === "update" && token?.name) {
        session.user.name = token.name;
      }
      if (trigger === "update" && token?.email) {
        session.user.email = token.email;
      }
      if (trigger === "update" && token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
