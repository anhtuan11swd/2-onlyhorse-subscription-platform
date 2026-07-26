import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RightPanel() {
  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 space-y-6 overflow-y-auto pt-14 lg:block lg:pt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="size-4 text-primary" />
            Thịnh hành
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Kỹ thuật cưỡi ngựa", "Chăm sóc ngựa", "Dinh dưỡng"].map((item) => (
            <div
              className="cursor-pointer text-sm hover:text-primary"
              key={item}
            >
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="size-4 text-primary" />
            Sản phẩm
          </CardTitle>
          <CardDescription>Áo thun OnlyHorse</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/merch">
            <Button className="w-full" size="sm">
              <Sparkles className="mr-2 size-4" />
              Mua ngay
            </Button>
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
