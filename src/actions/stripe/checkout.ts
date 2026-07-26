"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreatePrice, stripe } from "@/lib/stripe";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function createSubscriptionCheckout(
  lookupKey: "monthly" | "yearly",
) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (user?.role === "admin") throw new Error("Admin không thể mua gói");

  const priceId = await getOrCreatePrice(lookupKey);
  const checkout = await stripe.checkout.sessions.create({
    cancel_url: `${baseUrl}/stripe/cancel`,
    client_reference_id: session.userId,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId: session.userId },
    mode: "subscription",
    success_url: `${baseUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!checkout.url) throw new Error("Không thể tạo phiên thanh toán");
  return { url: checkout.url };
}

export async function createProductCheckout(productId: string) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.role === "admin")
    throw new Error("Chỉ người dùng mới được mua hàng");

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.archived) throw new Error("Sản phẩm không tồn tại");

  const order = await prisma.order.create({
    data: {
      productId: product.id,
      quantity: 1,
      status: "pending",
      stripeSessionId: "",
      total: product.price,
      userId: session.userId,
    },
  });

  const checkout = await stripe.checkout.sessions.create({
    cancel_url: `${baseUrl}/stripe/cancel`,
    client_reference_id: session.userId,
    line_items: [
      {
        price_data: {
          currency: "vnd",
          product_data: {
            images: product.image ? [product.image] : [],
            name: product.name,
          },
          unit_amount: Math.round(product.price),
        },
        quantity: 1,
      },
    ],
    metadata: { orderId: order.id, productId, userId: session.userId },
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["VN"] },
    success_url: `${baseUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!checkout.url) {
    await prisma.order.delete({ where: { id: order.id } });
    throw new Error("Không thể tạo phiên thanh toán");
  }

  return { url: checkout.url };
}
