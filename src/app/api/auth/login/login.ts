import { ApiException } from "@/shared/lib/exception/api.exception";
import { UserLoginType } from "@/types/auth/login.type";
import loginUserDomain from "@/domain/user/login";
import { ApiResponse } from "@/shared/lib/api/response/api.response.server";
import { LoginRequestSchema } from "@schemas/zod/api/auth/login.request.schema";
import { toError } from "@/shared/lib/error/error.normalize";

async function handler(req: UserLoginType) {
  const parsed = LoginRequestSchema.safeParse(req);
  if (!parsed?.success) {
    return ApiResponse(toError(parsed.error));
  }
  const response = await loginUserDomain(req);

  return ApiResponse(response);
}

export const Login = ApiException<{}, UserLoginType>(handler);
