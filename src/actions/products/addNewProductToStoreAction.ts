"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload";

export async function addNewProductToStoreAction(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Chưa đăng nhập");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (user?.role !== "admin") throw new Error("Không có quyền truy cập");

  const name = formData.get("name") as string;
  const priceRaw = formData.get("price") as string;
  const file = formData.get("image") as File | null;

  if (!name || !priceRaw) throw new Error("Vui lòng nhập đầy đủ thông tin");
  if (!file || file.size === 0) throw new Error("Vui lòng chọn ảnh sản phẩm");

  const priceVnd = Number.parseFloat(priceRaw);
  if (Number.isNaN(priceVnd) || priceVnd < 15000) {
    throw new Error("Giá tối thiểu là 15.000đ");
  }

  const price = Math.round(priceVnd);

  const { secureUrl } = await uploadToCloudinary(
    file,
    "/2-onlyhorse-subscription-platform/products",
  );

  const product = await prisma.product.create({
    data: { image: secureUrl, inventory: 0, name, price },
  });

  return { product, success: true };
}
