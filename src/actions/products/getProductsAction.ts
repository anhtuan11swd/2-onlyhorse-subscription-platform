"use server";

import { prisma } from "@/lib/prisma";

export async function getProductsAction() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    where: { archived: false },
  });
  return products;
}
