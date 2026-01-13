"use server";
import { AuthOptions } from "next-auth";
import { cookies } from "next/headers";
import { getSessionCookieName } from "./auth";
export const Logout = async (authOptions: AuthOptions) => {
  const cookie = await cookies();
  const cookieName: string = getSessionCookieName(authOptions) ?? "";
  cookie.delete(cookieName);
};
