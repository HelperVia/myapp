import { NextResponse } from "next/server";

export const ApiResponse = async (response: any) => {
  return NextResponse.json(response, {
    status: response?.status,
  });
};
