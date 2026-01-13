import { NextRequest, NextResponse } from "next/server";
import { toError } from "@/shared/lib/error/error.normalize";
import axios from "axios";

type ApiHandler<C = Record<string, any>, R = NextRequest, T = any> = (
  req: R | T,
  context?: C
) => Promise<NextResponse>;

export function ApiException<
  C extends Record<string, any> | undefined = Record<string, any>,
  R = NextRequest,
  T = any
>(handler: ApiHandler<C, R, T>) {
  return async (req: R | T, context?: C) => {
    try {
      const response = await handler(req, context);

      return response;
    } catch (e: any) {
      const errorData: {
        status?: number;
        debug?: string;
        error?: string | undefined | {};
      } = e || {};

      if (process.env.NEXT_PUBLIC_DEBUG === "true") {
        errorData.debug =
          errorData.debug ??
          JSON.stringify(
            {
              stack: e?.stack,
              response: e?.response?.data,
              status: e?.response?.status,
              config: e?.config,
            },
            null,
            2
          );
      }

      if (axios.isAxiosError(e)) {
        return NextResponse.json(errorData, {
          status: errorData?.status ?? 500,
        });
      }
      return NextResponse.json(
        toError(errorData?.error, e?.status, errorData?.debug),
        {
          status: errorData?.status ?? 500,
        }
      );
    }
  };
}
