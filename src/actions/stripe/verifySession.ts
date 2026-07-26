"use server";

import { prisma } from "@/lib/prisma";
import { sendReceiptEmail, sendWelcomeEmail } from "@/lib/send-email";
import { stripe } from "@/lib/stripe";

export async function verifyCheckoutSession(sessionId: string) {
  try {
    const checkout = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkout.payment_status === "paid") {
      const userId = checkout.metadata?.userId;
      const orderId = checkout.metadata?.orderId;

      if (userId) {
        const user = await prisma.user.findUnique({
          select: { email: true, name: true },
          where: { id: userId },
        });

        await prisma.user.update({
          data: { customerId: checkout.customer as string },
          where: { id: userId },
        });

        if (checkout.mode === "subscription") {
          await prisma.user.update({
            data: { isSubscribed: true },
            where: { id: userId },
          });

          if (user?.email) {
            await sendWelcomeEmail(user.name || "User", "Premium", user.email);
          }
        }

        if (orderId) {
          await prisma.order.update({
            data: { status: "paid", stripeSessionId: sessionId },
            where: { id: orderId },
          });

          const product = await prisma.product.findUnique({
            where: { id: checkout.metadata?.productId },
          });

          if (user?.email && product) {
            await sendReceiptEmail(
              user.name || "User",
              product.name,
              product.price,
              orderId,
              user.email,
            );
          }
        }
      }
    }

    return {
      amountTotal: checkout.amount_total,
      customerEmail:
        checkout.customer_email || checkout.customer_details?.email,
      mode: checkout.mode,
      paid: checkout.payment_status === "paid",
      status: checkout.status,
    };
  } catch {
    return null;
  }
}
