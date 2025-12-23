import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import { validateInviteEmail } from "@domain/team/invite/email.validate.domain";
import { toError } from "@/shared/lib/error/error.normalize";
import { teamInviteValidateEmailSchema } from "@schemas/zod/api/team/invite/validate.email.schema";
import { NextRequest } from "next/server";
async function handler(req: NextRequest) {
  const request = await req.json();
  const parsed = teamInviteValidateEmailSchema.safeParse(request);

  if (!parsed.success) {
    return ApiResponse(toError(parsed.error));
  }
  const email = request.email || null;
  const response = await validateInviteEmail(email);

  return ApiResponse(response);
}

export const POST = ApiException(handler);
