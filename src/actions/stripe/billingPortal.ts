"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function createBillingPortalAction() {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({
    select: { customerId: true },
    where: { id: session.userId },
  });

  if (!user?.customerId) throw new Error("Chưa có thông tin thanh toán");

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.customerId,
    return_url: `${baseUrl}/`,
  });

  return { url: portal.url };
}
