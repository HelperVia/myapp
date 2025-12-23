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
    const response = await baseApiFetch(input, init, {
      loading,
      loadingControl,
      headers,
    });

    if (response.status == 401) {
      isRedirect = true;
      redirect("/login");
    }
    if (response.status == 403) {
      isRedirect = true;
      redirect("/choose-company");
    }
    if (!isRedirect) {
      loading && decrementActiveRequests();
      return ApiResponse<T>(response);
    }
  } catch (e) {
    throw e;
  }
};
