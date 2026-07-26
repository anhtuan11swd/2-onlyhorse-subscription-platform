"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validation";

export async function commentOnPostAction(postId: string, content: string) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const result = commentSchema.safeParse({ content });
  if (!result.success) {
    const message = result.error.issues[0]?.message || "Dữ liệu không hợp lệ";
    throw new Error(message);
  }

  const comment = await prisma.comment.create({
    data: {
      content: result.data.content,
      postId,
      userId: session.userId,
    },
    include: {
      user: { select: { id: true, image: true, name: true } },
    },
  });

  return { comment };
}
