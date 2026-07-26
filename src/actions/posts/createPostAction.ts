"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload";

export async function createPostAction(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (user?.role !== "admin") throw new Error("Không có quyền truy cập");

  const caption = formData.get("caption") as string;
  const file = formData.get("media") as File | null;

  if (!caption) throw new Error("Vui lòng nhập nội dung");
  if (!file || file.size === 0) throw new Error("Vui lòng chọn file media");

  const { secureUrl, publicId, resourceType } = await uploadToCloudinary(file);

  const post = await prisma.post.create({
    data: {
      caption,
      isPublic: formData.get("isPublic") === "true",
      mediaType: resourceType,
      mediaUrl: secureUrl,
      publicId,
      userId: user.id,
    },
  });

  return { post, success: true };
}
