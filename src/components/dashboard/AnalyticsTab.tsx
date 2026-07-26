"use client";

import { useQuery } from "@tanstack/react-query";
import { CreditCard, Package, TrendingUp, Users } from "lucide-react";
import { getDashboardData } from "@/actions/dashboard/getDashboardData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AnalyticsTab() {
  const { data, isLoading } = useQuery({
    queryFn: getDashboardData,
    queryKey: ["dashboard"],
  });

  function formatVND(amount: number) {
    return amount.toLocaleString("vi-VN", {
      currency: "VND",
      style: "currency",
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <TrendingUp className="size-4 text-primary" />
            <CardTitle className="font-medium text-sm">Doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">
              {isLoading ? "..." : formatVND(data?.totalRevenue || 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <Package className="size-4 text-primary" />
            <CardTitle className="font-medium text-sm">Đã bán</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">
              {isLoading ? "..." : data?.totalSales || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <Users className="size-4 text-primary" />
            <CardTitle className="font-medium text-sm">Đã đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">
              {isLoading ? "..." : data?.totalSubscriptions || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="size-4 text-primary" />
            Giao dịch gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {isLoading ? (
              <p className="text-muted-foreground text-sm">Đang tải...</p>
            ) : data?.recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">Chưa có giao dịch</p>
            ) : (
              <div className="space-y-3">
                {data?.recentOrders.map((order) => (
                  <div
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                    key={order.id}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-muted-foreground text-xs">
                          {order.productName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatVND(order.total)}</p>
                      <Badge className="text-xs" variant="secondary">
                        Đã thanh toán
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
