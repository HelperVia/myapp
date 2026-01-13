import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import { NextRequest } from "next/server";
import { AgentDeleteSchema } from "@/schemas/zod/api/team/agent/delete.schema";
import { toError } from "@/shared/lib/error/error.normalize";
import { agentDeleteDomain } from "@/domain/team/agent/delete.domain";

type ContextType = {
  params: Promise<{
    id: string;
  }>;
};
async function handler(req: NextRequest, context?: ContextType) {
  if (!context) {
    throw new Error("Context is required");
  }
  const { id } = await context.params;

  const parsed = AgentDeleteSchema.safeParse({ id: id });
  if (!parsed.success) {
    return ApiResponse(toError(parsed?.error));
  }

  const response = await agentDeleteDomain(id);

  return ApiResponse(response);
}

export const DELETE = ApiException<ContextType>(handler);
