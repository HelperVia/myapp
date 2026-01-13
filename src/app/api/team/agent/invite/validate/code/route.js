import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@lib/api/api.server";
async function handler(req) {
  const request = await req.json();
  const code = request.code || null;
  const Service = await API();
  const response = await Service.post("teams/agent/invite/link/validate", {
    code: code,
  });

  return ApiResponse(response);
}

export const POST = ApiException(handler);
