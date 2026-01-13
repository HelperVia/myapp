import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Yes, No } from "@shared/constants/YesNo";
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    licenseNumber?: string;
    emailVerify?: typeof Yes | typeof No;

    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    licenseNumber?: string;
    emailVerify?: typeof Yes | typeof No;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    licenseNumber?: string;
    emailVerify?: typeof Yes | typeof No;
  }
}
