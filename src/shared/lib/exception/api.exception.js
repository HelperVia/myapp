import { NextResponse } from "next/server";
import { toError } from "@/shared/lib/error/error.normalize";
export function ApiException(handler) {
  return async (req, context) => {
    try {
      const response = await handler(req, context);

      return response;
    } catch (e) {
      const errorData = e || {};

      if (process.env.NEXT_PUBLIC_DEBUG) {
        errorData.debug = {
          stack: e?.stack,
          response: e?.response?.data,
          status: e?.response?.status,
          config: e?.config,
        };
      }

      return NextResponse.json(toError(errorData?.error, e?.status), {
        status: e?.status,
      });
    }
  };
}
