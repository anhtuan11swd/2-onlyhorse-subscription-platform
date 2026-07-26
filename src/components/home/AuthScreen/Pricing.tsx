"use client";

import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { UnderlinedText } from "@/components/decorators";
import { tiers } from "@/components/home/AuthScreen/data/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("vi-VN", {
    currency: "VND",
    style: "currency",
  });
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Bảng Giá <UnderlinedText>Linh Hoạt</UnderlinedText>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
          Chọn gói phù hợp nhất với nhu cầu của bạn
        </p>

        <RadioGroup
          className="mb-10 flex justify-center"
          defaultValue="monthly"
          onValueChange={(v) => setBilling(v as "monthly" | "annual")}
        >
          <div className="flex items-center gap-3 rounded-full border bg-background p-1">
            <div className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2">
              <RadioGroupItem
                className="cursor-pointer"
                id="monthly"
                value="monthly"
              />
              <Label className="cursor-pointer" htmlFor="monthly">
                Hàng tháng
              </Label>
            </div>
            <div className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2">
              <RadioGroupItem
                className="cursor-pointer"
                id="annual"
                value="annual"
              />
              <Label className="cursor-pointer" htmlFor="annual">
                Hàng năm
              </Label>
            </div>
          </div>
        </RadioGroup>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => {
            const price =
              billing === "monthly" ? tier.monthlyPrice : tier.annualPrice;
            return (
              <Card
                className={`relative flex flex-col overflow-visible transition-all duration-300 hover:scale-[1.02] hover:border-primary ${
                  tier.highlighted ? "border-primary shadow-xl" : ""
                }`}
                key={tier.name}
              >
                {tier.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {tier.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="font-bold text-4xl">
                      {formatPrice(price)}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      /{billing === "monthly" ? "tháng" : "năm"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        className="flex items-center gap-2 text-sm"
                        key={feature}
                      >
                        <Check className="size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button
                      className="w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      <Sparkles className="size-4" />
                      Đăng ký ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
