import { Logout } from "@shared/utils/next-auth/logout";
import { authOptions } from "@lib/next-auth/authOptions";
import {
  apiFetch as baseApiFetch,
  _activeRequests,
  _updateLoadingState,
  decrementActiveRequests,
} from "@/shared/lib/api/api.fetch";
import { ApiResponse } from "@/shared/lib/api/response/api.response.client";
import { redirect } from "next/navigation";

type apiFetchOptions = {
  loading?: boolean;
  loadingControl?: boolean;
  headers?: Headers;
};
export const apiFetch = async <T>(
  input: string,
  init = {},
  options: apiFetchOptions = {}
) => {
  const { loading = true, loadingControl = true, headers } = options;

  let isRedirect = false;
  try {
    const fetch = await baseApiFetch(input, init, {
      loading,
      loadingControl,
      headers,
    });
    const response = await ApiResponse<T>(fetch);

    if (response.status == 401) {
      isRedirect = true;
      Logout(authOptions);
      redirect("/login");
    }
    if (response.status == 403 && response.error == "EmailNotVerified") {
      isRedirect = true;
      Logout(authOptions);
      redirect("/email-verification");
    }
    if (response.status == 403) {
      isRedirect = true;
      redirect("/choose-company");
    }

    if (!isRedirect) {
      loading && decrementActiveRequests();
      return response;
    }
  } catch (e) {
    throw e;
  }
};
