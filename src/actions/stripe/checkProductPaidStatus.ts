"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function checkProductPaidStatus(orderId: string) {
  const session = await getSession();
  if (!session) return null;

  const order = await prisma.order.findUnique({
    include: { product: true },
    where: { id: orderId },
  });

  if (!order || order.userId !== session.userId) return null;

  return {
    id: order.id,
    isPaid: order.status === "paid",
    product: order.product,
    status: order.status,
    total: order.total,
  };
}
