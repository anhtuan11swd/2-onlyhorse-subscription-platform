"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function checkAuthStatus() {
  const session = await getSession();
  if (!session)
    return { error: "Không tìm thấy phiên đăng nhập", success: false as const };

  const user = await prisma.user.findUnique({
    select: {
      email: true,
      id: true,
      image: true,
      isSubscribed: true,
      name: true,
    },
    where: { id: session.userId },
  });

  if (!user)
    return { error: "Không tìm thấy người dùng", success: false as const };

  return { success: true as const, user };
}
