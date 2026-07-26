"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleProductArchive(productId: string) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (user?.role !== "admin") throw new Error("Không có quyền truy cập");

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) throw new Error("Không tìm thấy sản phẩm");

  const updated = await prisma.product.update({
    data: { archived: !product.archived },
    where: { id: productId },
  });

  return { product: updated, success: true };
}
