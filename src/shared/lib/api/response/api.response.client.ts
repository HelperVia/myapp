const defaultErrorMessage = "Network or parsing error";
import { ResponseClientTypes } from "@/shared/types/api/response.client.type";
export const ApiResponse = async <T>(
  response: any
): Promise<ResponseClientTypes<T>> => {
  try {
    const data = await response.json();

    if (data?.success) {
      return {
        ok: true,
        data: data?.data || {},
        message: data?.message || "",
        status: data?.status,
        error: null,
      };
    }

    let errorMessage: string = "";
    if (!data?.success) {
      if (data?.error) {
        if (typeof data.error === "string") {
          errorMessage = data.error;
        } else if (typeof data.error === "object") {
          const errors: string[] | null = Object.values(
            data.error
          ).flat() as string[];
          errorMessage = errors[0] || defaultErrorMessage;
        }
      } else if (data?.message) {
        errorMessage = data.message;
      }
    }

    return {
      ok: false,
      error: errorMessage,
      status: data?.status,
    };
  } catch (e) {
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
      console.log(e);
    }
    return {
      ok: false,
      error: defaultErrorMessage,
      status: 500,
    };
  }
};
