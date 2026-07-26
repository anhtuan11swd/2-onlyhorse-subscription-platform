import { redirect } from "next/navigation";
import { getProductsAction } from "@/actions/products/getProductsAction";
import BaseLayout from "@/components/layout/BaseLayout";
import ProductCard from "@/components/merch/ProductCard";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function MerchPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const products = await getProductsAction();

  const user = await prisma.user.findUnique({
    select: { role: true },
    where: { id: session.userId },
  });

  return (
    <BaseLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 font-bold text-3xl">Cửa hàng</h1>
        <p className="mb-8 text-muted-foreground">
          Sản phẩm chính thức của OnlyHorse
        </p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl">🛍️</p>
            <p className="mt-4 font-medium text-lg">Chưa có sản phẩm</p>
            <p className="text-muted-foreground text-sm">Quay lại sau nhé!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                isAdmin={user?.role === "admin"}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
