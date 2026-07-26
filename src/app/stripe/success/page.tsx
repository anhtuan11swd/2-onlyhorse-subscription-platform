import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyCheckoutSession } from "@/actions/stripe/verifySession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function StripeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  const result = await verifyCheckoutSession(session_id);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <CheckCircle className="mx-auto mb-2 size-12 text-green-500" />
          <CardTitle>Thanh toán thành công!</CardTitle>
          <CardDescription>
            {result?.mode === "subscription"
              ? "Cảm ơn bạn đã đăng ký! Bạn đã có quyền truy cập Premium."
              : "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <div className="rounded-lg bg-muted p-4 text-left text-sm">
              <p>
                <span className="font-medium">Trạng thái:</span>{" "}
                {result.paid ? "✅ Đã thanh toán" : "⏳ Đang xử lý"}
              </p>
              {result.amountTotal && (
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  {result.amountTotal.toLocaleString("vi-VN", {
                    currency: "VND",
                    style: "currency",
                  })}
                </p>
              )}
              {result.customerEmail && (
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {result.customerEmail}
                </p>
              )}
            </div>
          )}
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 size-4" />
              Về trang chủ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
