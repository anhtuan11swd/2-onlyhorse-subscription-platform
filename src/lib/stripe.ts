import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function getOrCreatePrice(
  lookupKey: "monthly" | "yearly",
): Promise<string> {
  const prices = await stripe.prices.list({
    limit: 1,
    lookup_keys: [lookupKey],
  });

  if (prices.data.length > 0) {
    return prices.data[0].id;
  }

  const isMonthly = lookupKey === "monthly";
  const product = await stripe.products.create({
    name: isMonthly
      ? "OnlyHorse Premium - Monthly"
      : "OnlyHorse Premium - Yearly",
  });

  const price = await stripe.prices.create({
    currency: "vnd",
    lookup_key: lookupKey,
    product: product.id,
    recurring: { interval: isMonthly ? "month" : "year" },
    unit_amount: isMonthly ? 190000 : 1900000,
  });

  return price.id;
}
