import { Home, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StripeCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <XCircle className="mx-auto mb-2 size-12 text-muted-foreground" />
          <CardTitle>Thanh toán bị hủy</CardTitle>
          <CardDescription>
            Giao dịch của bạn chưa được hoàn tất. Không có khoản nào bị tính
            phí.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 size-4" />
              Quay lại trang chủ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
