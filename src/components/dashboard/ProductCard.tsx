"use client";

import type { Product } from "@prisma/client";
import { Archive, ArchiveRestore, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { toggleProductArchive } from "@/actions/products/toggleProductArchive";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({
  product,
  onToggle,
}: {
  product: Product;
  onToggle: () => void;
}) {
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    setPending(true);
    try {
      await toggleProductArchive(product.id);
      toast.success(product.archived ? "Đã hiện sản phẩm" : "Đã ẩn sản phẩm");
      onToggle();
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {product.image && (
          <Image
            alt={product.name}
            className="h-16 w-16 rounded-lg object-cover"
            height={64}
            src={product.image}
            width={64}
          />
        )}
        <div className="flex-1">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <CardDescription>
            {product.price.toLocaleString("vi-VN", {
              currency: "VND",
              style: "currency",
            })}
          </CardDescription>
        </div>
        <Badge variant={product.archived ? "secondary" : "default"}>
          {product.archived ? "Đã ẩn" : "Đang bán"}
        </Badge>
      </CardHeader>
      <CardContent>
        <Button
          disabled={pending}
          onClick={handleToggle}
          size="sm"
          variant="outline"
        >
          {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {product.archived ? (
            <>
              <ArchiveRestore className="mr-2 size-4" />
              Hiện
            </>
          ) : (
            <>
              <Archive className="mr-2 size-4" />
              Ẩn
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
