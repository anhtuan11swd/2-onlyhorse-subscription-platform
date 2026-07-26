"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAuthStatus } from "@/actions/auth/check-auth-status";

export default function AuthCallbackPage() {
  const router = useRouter();

  const { data, isSuccess, isError } = useQuery({
    queryFn: checkAuthStatus,
    queryKey: ["auth-status"],
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (isSuccess && data?.success) {
      const redirect = localStorage.getItem("stripe-redirect");
      if (redirect) {
        localStorage.removeItem("stripe-redirect");
        try {
          const parsed = JSON.parse(redirect);
          const lookupKey = parsed.billing === "annual" ? "yearly" : "monthly";
          fetch("/api/auth/me")
            .then((r) => r.json())
            .then((me) => {
              if (me.user) {
                import("@/actions/stripe/checkout").then((mod) =>
                  mod.createSubscriptionCheckout(lookupKey).then((res) => {
                    window.location.assign(res.url);
                  }),
                );
              }
            });
        } catch {
          // ignore invalid redirect data
        }
        return;
      }
      router.replace("/");
    }
  }, [isSuccess, data, router]);

  if (isError || (data && !data.success)) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg">
            Phiên đăng nhập không hợp lệ
          </p>
          <p className="mt-1 text-muted-foreground text-sm">
            Vui lòng{" "}
            <Link
              className="text-primary underline underline-offset-4"
              href="/login"
            >
              đăng nhập lại
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-center">
        <Loader className="mx-auto mb-4 size-8 animate-spin text-muted-foreground" />
        <p className="font-medium text-lg">Đang thiết lập tài khoản...</p>
        <p className="mt-1 text-muted-foreground text-sm">Vui lòng chờ</p>
      </div>
    </div>
  );
}
