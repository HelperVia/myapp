import { NextResponse } from "next/server";
import API from "@shared/lib/api/api.server";
export async function POST(req) {
  const request = await req.json();

  const code = request.code || null;
  const formData = new FormData();
  formData.append("code", code);
  try {
    const response = await API.post("team/invite/accept", formData);

    return NextResponse.json(response?.data, {
      status: response?.status,
    });
  } catch (e) {
    return NextResponse.json(e?.data, {
      status: e?.status,
    });
  }
}
