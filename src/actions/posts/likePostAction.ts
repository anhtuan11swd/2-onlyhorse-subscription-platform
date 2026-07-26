"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function likePostAction(postId: string) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const existing = await prisma.like.findFirst({
    where: { postId, userId: session.userId },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.like.create({
    data: { postId, userId: session.userId },
  });
  return { liked: true };
}
