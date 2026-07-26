"use server";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function verifyCheckoutSession(sessionId: string) {
  try {
    const checkout = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkout.payment_status === "paid") {
      const userId = checkout.metadata?.userId;
      const orderId = checkout.metadata?.orderId;

      if (userId) {
        await prisma.user.update({
          data: { customerId: checkout.customer as string },
          where: { id: userId },
        });

        if (checkout.mode === "subscription") {
          await prisma.user.update({
            data: { isSubscribed: true },
            where: { id: userId },
          });
        }

        if (orderId) {
          await prisma.order.update({
            data: { status: "paid", stripeSessionId: sessionId },
            where: { id: orderId },
          });
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
