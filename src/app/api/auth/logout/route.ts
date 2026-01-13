import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import API from "@lib/api/api.server";
import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
  const Service = await API();
  const response = await Service.post("auth/logout");

  return ApiResponse(response);
}
export const POST = ApiException(handler);
