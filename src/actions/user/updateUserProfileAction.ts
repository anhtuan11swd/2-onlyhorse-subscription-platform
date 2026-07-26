"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload";
import { profileSchema } from "@/lib/validation";

export async function updateUserProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const name = formData.get("name") as string;
  const file = formData.get("image") as File | null;

  const result = profileSchema.safeParse({ name });
  if (!result.success) {
    const message = result.error.issues[0]?.message || "Dữ liệu không hợp lệ";
    throw new Error(message);
  }

  const updateData: Record<string, string> = {};
  updateData.name = result.data.name;

  if (file && file.size > 0) {
    const { secureUrl } = await uploadToCloudinary(
      file,
      "/2-onlyhorse-subscription-platform/users",
    );
    updateData.image = secureUrl;
  }

  await prisma.user.update({
    data: updateData,
    where: { id: session.userId },
  });

  revalidatePath("/", "layout");
  return { message: "Cập nhật thành công", success: true };
}
