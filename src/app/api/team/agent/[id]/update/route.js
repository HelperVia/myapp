import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@shared/lib/api/api.server";

async function handler(req, { params }) {
  const id = params.id;
  const request = await req.json();
  const response = await API.post("teams/agent/" + id + "/update", request);
  return ApiResponse(response);
}

export const POST = ApiException(handler);
