import { ErrorPayload, ErrorEnvelope } from "@shared/types/error/error";
import { ZodError } from "zod";

export const toError = (
  errorOrStatus?: unknown,
  status?: number,
  debug?: string
): ErrorEnvelope => {
  if (typeof errorOrStatus === "number") {
    return getErrorSchema(undefined, errorOrStatus, debug);
  }

  const error = errorOrStatus as ErrorPayload | ZodError | Error;
  if (error instanceof ZodError) {
    const parsed = parserZodError(error);

    return getErrorSchema(parsed, status, debug);
  }

  if (looksLikeZodError(error)) {
    const parsed = parserZodError(error);
    return getErrorSchema(parsed, status ?? 400, debug);
  }

  if (
    error instanceof Error ||
    (error && typeof error === "object" && "message" in (error as any))
  ) {
    const msg =
      error instanceof Error ? error.message : String((error as any).message);
    return getErrorSchema(msg, status ?? 500, debug);
  }

  return getErrorSchema(error, status, debug);
};

export const getErrorSchema = (
  error?: ErrorPayload,
  status?: number,
  debug?: string
): ErrorEnvelope => {
  return {
    success: false,
    error: error ?? "Something went wrong, please try again",
    debug: debug,
    status: status ?? 500,
  };
};

export function looksLikeZodError(
  obj: unknown
): obj is { issues: Array<{ path?: any[]; message: string }> } {
  if (!obj || typeof obj !== "object") return false;
  const anyObj = obj as any;
  if (!Array.isArray(anyObj.issues)) return false;
  return anyObj.issues.every((it: any) => {
    if (!it || typeof it !== "object") return false;
    const hasMessage = typeof it.message === "string";
    const pathIsOk = it.path === undefined || Array.isArray(it.path);
    return hasMessage && pathIsOk;
  });
}

export const parserZodError = (error: unknown): ErrorPayload => {
  const errors: Record<string, string> = {};
  let issues: any[] | undefined;

  if (error instanceof ZodError) {
    issues = error.issues;
  } else if (looksLikeZodError(error)) {
    issues = (error as { issues: any[] }).issues;
  } else {
    return errors;
  }
  if (!issues) return errors;

  issues.forEach((v, k) => {
    errors[k] = v.message;
  });
  return errors;
};
