import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import { teamInviteSchema } from "@schemas/zod/api/team/invite/invite.schema";

import { teamInviteDomain } from "@domain/team/invite/invite.domain";
import { NextRequest } from "next/server";
import { toError } from "@/shared/lib/error/error.normalize";

async function handler(req: NextRequest) {
  const request = await req.json();
  const parsed = teamInviteSchema.safeParse(request);
  if (!parsed.success) {
    return ApiResponse(toError(parsed.error));
  }

  const response = await teamInviteDomain(parsed.data);

  return ApiResponse(response);
}

export const POST = ApiException(handler);
