"use client";

import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/validation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setFieldErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        body: JSON.stringify(result.data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const err of data.errors) {
            fieldErrors[err.field] = err.message;
          }
          setFieldErrors(fieldErrors);
        } else {
          toast.error(data.error || "Đăng nhập thất bại");
          setError(data.error || "Đăng nhập thất bại");
        }
        return;
      }

      toast.success("Đăng nhập thành công");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập tài khoản</CardTitle>
          <CardDescription>
            Nhập email để đăng nhập vào tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  className={loading ? "opacity-50" : undefined}
                  disabled={loading}
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
                {fieldErrors.email && (
                  <p className="text-destructive text-sm">
                    {fieldErrors.email}
                  </p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <button
                    className={cn(
                      "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                      loading && "pointer-events-none no-underline opacity-50",
                    )}
                    disabled={loading}
                    type="button"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    className={cn("pr-10", loading && "opacity-50")}
                    disabled={loading}
                    id="password"
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className={cn(
                      "absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                      loading && "pointer-events-none opacity-50",
                    )}
                    disabled={loading}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-destructive text-sm">
                    {fieldErrors.password}
                  </p>
                )}
              </Field>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Field>
                <Button
                  className={cn("w-full", loading && "opacity-50")}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    "Đang đăng nhập..."
                  ) : (
                    <>
                      <LogIn className="size-4" />
                      Đăng nhập
                    </>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Chưa có tài khoản?{" "}
                  <Link
                    className={cn(
                      "underline underline-offset-4 hover:text-primary",
                      loading && "pointer-events-none no-underline opacity-50",
                    )}
                    href="/signup"
                    tabIndex={loading ? -1 : undefined}
                  >
                    Đăng ký
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
