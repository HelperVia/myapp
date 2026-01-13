import { AcceptInviteDomain } from "@/domain/team/invite/accept.invite.domain";
import { AcceptInviteSchema } from "@/schemas/zod/api/team/invite/accept.invite.schema";
import { ApiResponse } from "@/shared/lib/api/response/api.response.server";
import { toError } from "@/shared/lib/error/error.normalize";
import { ApiException } from "@/shared/lib/exception/api.exception";
import { NextRequest } from "next/server";

export const handler = async (req: NextRequest) => {
  const request = await req.json();
  const parsed = AcceptInviteSchema.safeParse(request);
  if (!parsed.success) {
    return ApiResponse(toError(parsed?.error));
  }

  const response = await AcceptInviteDomain(request.code);

  return ApiResponse(response);
};

export const POST = ApiException(handler);
