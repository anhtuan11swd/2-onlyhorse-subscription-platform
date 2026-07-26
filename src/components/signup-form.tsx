"use client";

import { Eye, EyeOff, UserPlus } from "lucide-react";
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
import { signupSchema } from "@/lib/validation";

export function SignupForm({
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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    const result = signupSchema.safeParse({
      confirmPassword,
      email,
      name: name || undefined,
      password,
    });
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
      const res = await fetch("/api/auth/register", {
        body: JSON.stringify({
          confirmPassword: result.data.confirmPassword,
          email: result.data.email,
          name: result.data.name,
          password: result.data.password,
        }),
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
          toast.error(data.error || "Đăng ký thất bại");
          setError(data.error || "Đăng ký thất bại");
        }
        return;
      }

      toast.success("Đăng ký thành công, vui lòng đăng nhập");
      router.push("/login");
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
          <CardTitle>Tạo tài khoản</CardTitle>
          <CardDescription>
            Nhập thông tin để tạo tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
                <Input
                  className={loading ? "opacity-50" : undefined}
                  disabled={loading}
                  id="name"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  required
                  type="text"
                />
                {fieldErrors.name && (
                  <p className="text-destructive text-sm">{fieldErrors.name}</p>
                )}
              </Field>
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
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
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
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Xác nhận mật khẩu
                </FieldLabel>
                <div className="relative">
                  <Input
                    className={cn("pr-10", loading && "opacity-50")}
                    disabled={loading}
                    id="confirm-password"
                    name="confirm-password"
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
                {fieldErrors.confirmPassword && (
                  <p className="text-destructive text-sm">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </Field>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <FieldGroup>
                <Field>
                  <Button
                    className={cn("w-full", loading && "opacity-50")}
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? (
                      "Đang tạo tài khoản..."
                    ) : (
                      <>
                        <UserPlus className="size-4" />
                        Tạo tài khoản
                      </>
                    )}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Đã có tài khoản?{" "}
                    <Link
                      className={cn(
                        "underline underline-offset-4 hover:text-primary",
                        loading &&
                          "pointer-events-none no-underline opacity-50",
                      )}
                      href="/login"
                      tabIndex={loading ? -1 : undefined}
                    >
                      Đăng nhập
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
