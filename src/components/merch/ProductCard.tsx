"use client";

import type { Product } from "@prisma/client";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { createProductCheckout } from "@/actions/stripe/checkout";
import { Button } from "@/components/ui/button";

export default function ProductCard({
  product,
  isAdmin,
}: {
  product: Product;
  isAdmin?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const displayPrice = product.price.toLocaleString("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  async function handleBuy() {
    setLoading(true);
    try {
      const { url } = await createProductCheckout(product.id);
      window.location.assign(url);
    } catch {
      toast.error("Có lỗi xảy ra");
      setLoading(false);
    }
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        {product.image ? (
          <Image
            alt={product.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            src={product.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            Không có ảnh
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-3">
          <p className="font-bold text-lg text-primary">{displayPrice}</p>
          {!isAdmin && (
            <Button
              className="mt-3 w-full"
              disabled={loading}
              onClick={handleBuy}
              size="sm"
            >
              {loading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <ShoppingCart className="mr-2 size-4" />
              )}
              {loading ? "Đang xử lý..." : "Mua ngay"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
