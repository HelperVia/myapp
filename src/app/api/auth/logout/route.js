import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@shared/lib/api/api.server";

async function handler(req) {
  const response = await API.post("auth/logout");

  return ApiResponse(response);
}
export const POST = ApiException(handler);
