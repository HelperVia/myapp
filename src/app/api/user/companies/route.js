import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@lib/api/api.server";

async function handler(req) {
  const Service = await API();
  const response = await Service.post("user/companies");

  return ApiResponse(response);
}
export const POST = ApiException(handler);
