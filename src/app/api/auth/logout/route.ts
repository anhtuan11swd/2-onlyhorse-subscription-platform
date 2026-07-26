import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(request: Request) {
  await clearSession();

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return NextResponse.json({ message: "Đã đăng xuất" });
  }

  return NextResponse.redirect(new URL("/", request.url));
}
