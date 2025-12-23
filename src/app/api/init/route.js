import { NextResponse, NextRequest } from "next/server";

import API from "@shared/lib/api/api.server";

export async function POST(request) {
  try {
    const response = await API.post("initialize");

    return NextResponse.json(response?.data, {
      status: response?.status,
    });
  } catch (e) {
    return NextResponse.json(e?.data, {
      status: e?.status,
    });
  }
}
