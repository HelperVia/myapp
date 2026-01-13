import { SuspendAgentDomain } from "@/domain/team/agent/suspend.domain";
import { AgentSuspendSchema } from "@/schemas/zod/api/team/agent/suspend.schema";
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
  const parsed = AgentSuspendSchema.safeParse({ id: id });

  if (!parsed.success) return ApiResponse(parsed.error);

  const response = await SuspendAgentDomain(id);
  return ApiResponse(response);
};

export const POST = ApiException<ContextType>(handler);
