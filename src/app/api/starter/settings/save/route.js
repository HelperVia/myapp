import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@shared/lib/api/api.server";

async function handler(req) {
  const request = await req.json();
  const name = request?.name || "";
  const response = await API.post("user/setting/update", {
    name: name,
  });

  return ApiResponse(response);
}
export const POST = ApiException(handler);
