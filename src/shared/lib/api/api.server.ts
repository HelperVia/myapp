import axios from "axios";
import { cookies } from "next/headers";
import { toError } from "@shared/lib/error/error.normalize";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
export const removeCookies = async () => {
  const prefix = process.env.NEXT_PUBLIC_APP_PREFIX;
  const store = await cookies();
  store.delete(prefix + "_token");
  store.delete(prefix + "_app_license_number");
};

const AxiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_SERVICE,
  timeout: 100000,
  headers: {
    Accept: "application/json",
  },
});

AxiosServer.interceptors.request.use(async (conf) => {
  const newConf = { ...conf };
  const session = await getServerSession(authOptions);

  const token = session?.accessToken || "";
  const license = session?.licenseNumber || "";

  newConf.headers["X-License"] = license;

  newConf.headers["Authorization"] = "Bearer " + token;
  newConf.headers["Content-Type"] = "application/x-www-form-urlencoded";

  newConf.params = conf.params || {};

  return newConf;
});

AxiosServer.interceptors.response.use(
  (response) => {
    if (response.data?.authentication === false) {
      removeCookies();
    }
    if (
      typeof response.data !== "object" ||
      response.data === null ||
      Array.isArray(response.data)
    ) {
      return toError(response.status);
    }
    console.log(response);
    return response.data;
  },
  (error) => {
    console.log(error);
    let status = error.response?.status || 500;
    if (status >= 400 && status < 500) {
      if (error.response?.status === 401) {
        removeCookies();
      }
      if (
        typeof error.response.data !== "object" ||
        error.response.data === null ||
        Array.isArray(error.response.data)
      ) {
        return toError(status);
      }

      return Promise.reject(toError(error.response?.data?.error, status));
    }
    removeCookies();

    return Promise.reject(toError(status));
  }
);

export default AxiosServer;
