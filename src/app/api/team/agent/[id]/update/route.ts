import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";
import { NextRequest } from "next/server";
import { UpdateAgentDomain } from "@/domain/team/agent/update.domain";
import { AgentUpdateSchema } from "@/schemas/zod/api/team/agent/update.schema";
import { toError } from "@/shared/lib/error/error.normalize";
type ContextType = {
  params: Promise<{
    id: string;
  }>;
};
async function handler(req: NextRequest, context?: ContextType) {
  if (!context) {
    throw new Error("Context is required");
  }
  const { id: agentId } = await context.params;
  const request = {
    ...(await req.json()),
    id: agentId,
  };

  console.log(request);
  const parsed = AgentUpdateSchema.safeParse(request);
  if (!parsed.success) {
    return ApiResponse(toError(parsed?.error));
  }
  const { id, ...payload } = parsed.data;
  const response = await UpdateAgentDomain(id, payload);

  return ApiResponse(response);
}

export const POST = ApiException(handler);
