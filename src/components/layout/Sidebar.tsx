"use client";

import {
  CreditCard,
  Home,
  Laptop,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Shirt,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/merch", icon: Shirt, label: "Cửa hàng" },
  {
    adminOnly: true,
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Bảng điều khiển",
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, []);

  const visibleLinks = sidebarLinks.filter(
    (link) => !link.adminOnly || user?.role === "admin",
  );

  async function handleLogout() {
    setLoggingOut(true);
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
      setLoggingOut(false);
    }
  }

  return (
    <>
      <div className="mb-8 flex justify-center lg:px-4">
        <Link className="font-bold text-lg tracking-tight" href="/">
          OnlyHorse
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 lg:px-3">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              href={link.href}
              key={link.href}
            >
              <Icon className="size-5 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t px-2 pt-4 lg:px-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground">
            <Settings className="size-5 shrink-0" />
            <span>Cài đặt</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 [&>[data-slot=dropdown-menu-item]]:cursor-pointer"
          >
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 size-4" />
              Sáng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 size-4" />
              Tối
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop className="mr-2 size-4" />
              Hệ thống
            </DropdownMenuItem>
            <div className="my-1 h-px bg-border" />
            {user?.role !== "admin" && (
              <DropdownMenuItem
                onClick={() => (window.location.href = "/subscription")}
              >
                <CreditCard className="mr-2 size-4" />
                Thanh toán
              </DropdownMenuItem>
            )}
            <DropdownMenuItem disabled={loggingOut} onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-56 flex-col border-r bg-background py-4 lg:flex">
        <SidebarContent />
      </aside>

      <Sheet>
        <SheetTrigger className="fixed top-4 left-4 z-40 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-sm shadow-xs outline-none transition-[color,box-shadow] hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden">
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent className="flex w-64 flex-col py-4" side="left">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">OnlyHorse</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
