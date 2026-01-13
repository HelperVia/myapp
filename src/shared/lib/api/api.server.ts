"use server";
import axios from "axios";
import { toError } from "@shared/lib/error/error.normalize";

type WithOptionalContentType<T> = T & {
  "Content-Type"?: string;
};

type optionsType = {
  baseURL?: string;
  Timeout?: number;
  Accept?: string;
};
export const createAxiosServer = async <T>(
  headers: WithOptionalContentType<T> = {} as WithOptionalContentType<T>,
  options?: optionsType
) => {
  const AxiosServer = axios.create({
    baseURL:
      options?.baseURL || process.env.NEXT_PUBLIC_REACT_APP_SERVICE || "",
    timeout: options?.Timeout ?? 100000,
    headers: {
      Accept: options?.Accept || "application/json",
    },
  });

  AxiosServer.interceptors.request.use(async (conf) => {
    const newConf = { ...conf };

    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        newConf.headers.set(key, String(value));
      });
    }

    newConf.headers["Content-Type"] =
      headers["Content-Type"] || "application/x-www-form-urlencoded";
    newConf.params = conf.params || {};
    return newConf;
  });

  AxiosServer.interceptors.response.use(
    (response) => {
      if (
        typeof response.data !== "object" ||
        response.data === null ||
        Array.isArray(response.data)
      ) {
        return toError(response.status);
      }

      return response.data;
    },
    (error) => {
      let status = error.response?.status || 500;
      if (status >= 400 && status < 500) {
        if (
          typeof error.response.data !== "object" ||
          error.response.data === null ||
          Array.isArray(error.response.data)
        ) {
          return toError(status);
        }

        return Promise.reject(
          toError(
            error.response?.data?.error,
            status,
            process.env.NEXT_PUBLIC_DEBUG === "true"
              ? JSON.stringify(error.response?.data?.exception)
              : undefined
          )
        );
      }

      return Promise.reject(toError(status));
    }
  );

  return AxiosServer;
};
