"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export default function HomeScreen({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!res.ok) return;

      toast.success("Đăng xuất thành công");
      router.refresh();
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="font-bold text-2xl">
        Xin chào, {user.name || user.email}
      </h1>
      <p className="text-muted-foreground">Bảng tin</p>
      <Button
        disabled={loading}
        onClick={handleLogout}
        type="button"
        variant="outline"
      >
        <LogOut className="mr-2 size-4" />
        {loading ? "Đang đăng xuất..." : "Đăng xuất"}
      </Button>
    </div>
  );
}
