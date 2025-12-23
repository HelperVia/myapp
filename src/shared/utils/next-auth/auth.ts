import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
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
