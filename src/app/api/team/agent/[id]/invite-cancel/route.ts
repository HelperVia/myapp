import { CancelInviteDomain } from "@/domain/team/invite/cancel-invite.domain";
import { InviteCancelSchema } from "@/schemas/zod/api/team/invite/invite-cancel.schema";
import { ApiResponse } from "@/shared/lib/api/response/api.response.server";
import { ApiException } from "@/shared/lib/exception/api.exception";
import { NextRequest } from "next/server";

type ContextType = {
  params: Promise<{
    id: string;
  }>;
};
export const handler = async (req: NextRequest, context?: ContextType) => {
  if (!context) {
    throw new Error("Context is required");
  }
  const { id } = await context.params;
  const parsed = InviteCancelSchema.safeParse({ id: id });

  if (!parsed.success) return ApiResponse(parsed.error);

  const response = await CancelInviteDomain(id);
  return ApiResponse(response);
};

export const DELETE = ApiException<ContextType>(handler);
