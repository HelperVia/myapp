import { AuthOptions } from "next-auth";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
export const getAuthToken = (
  req: NextRequest,
  cookieName?: string,
  secret?: string
): Promise<JWT | null> => {
  return getToken({
    req,
    secret: secret || process.env.NEXTAUTH_SECRET || "",
    ...(cookieName ? { cookieName: cookieName } : {}),
  });
};

export const getSessionCookieName = (authOptions: AuthOptions) => {
  return authOptions.cookies?.sessionToken?.name;
};

export const getSession = async (authOptions: AuthOptions) => {
  const session = await getServerSession(authOptions);
  return session;
};
