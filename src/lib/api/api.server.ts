import { authOptions } from "@lib/next-auth/authOptions";
import { createAxiosServer } from "@shared/lib/api/api.server";
import { getSession } from "@/shared/utils/next-auth/auth";

export const Service = async () => {
  const session = await getSession(authOptions);

  console.log(session?.accessToken);
  const headers = {
    "X-License": session?.licenseNumber?.toString() ?? "",
    Authorization: session?.accessToken ? "Bearer " + session.accessToken : "",
  };

  return createAxiosServer<Partial<typeof headers>>(headers);
};

export default Service;
