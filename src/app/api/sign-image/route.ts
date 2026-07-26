import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST() {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "/2-onlyhorse-subscription-platform/posts";
    const signature = cloudinary.utils.api_sign_request(
      { folder, timestamp },
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return NextResponse.json({
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder,
      signature,
      timestamp,
    });
  } catch {
    return NextResponse.json(
      { error: "Không thể tạo chữ ký" },
      { status: 500 },
    );
  }
}
