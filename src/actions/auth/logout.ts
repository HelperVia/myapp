import { apiFetch } from "@/lib/api/api.fetch";

import { ApiResponse } from "@/shared/lib/api/response/api.response.client";

export const Logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });
  const response = await ApiResponse(res);

  if (response?.ok) {
    return true;
  }
  return false;
};
