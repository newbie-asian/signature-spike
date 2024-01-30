import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Todo validation of user
    const params = await req.json();
    console.log("%c Line:9 🥥 params", "color:#33a5ff", params);
    const { email, password } = params;
    cookies().set("token", JSON.stringify({ email, password }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    return NextResponse.json({ email, password });
  } catch (error) {
    return new Response("Internal server error.", {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
