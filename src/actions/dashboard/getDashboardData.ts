"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const [totalOrders, totalSubscriptions, recentOrders] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "paid" },
    }),
    prisma.user.count({
      where: { isSubscribed: true },
    }),
    prisma.order.findMany({
      include: {
        product: { select: { name: true } },
        user: { select: { email: true, image: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      where: { status: "paid" },
    }),
  ]);

  return {
    recentOrders: recentOrders.map((o) => ({
      createdAt: o.createdAt.toISOString(),
      customerEmail: o.user.email,
      customerImage: o.user.image,
      customerName: o.user.name || "N/A",
      id: o.id,
      productName: o.product?.name || "N/A",
      total: o.total,
    })),
    totalRevenue: totalOrders._sum.total || 0,
    totalSales: recentOrders.length,
    totalSubscriptions,
  };
}
