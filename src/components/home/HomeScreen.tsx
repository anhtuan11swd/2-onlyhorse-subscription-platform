"use client";

import { Bell } from "lucide-react";
import BaseLayout from "@/components/layout/BaseLayout";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

const placeholderPosts = [
  { id: "p1" },
  { id: "p2" },
  { id: "p3" },
  { id: "p4" },
  { id: "p5" },
];

export default function HomeScreen({ user }: { user: User }) {
  return (
    <BaseLayout>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">
              Xin chào, {user.name || user.email}
            </h1>
            <p className="text-muted-foreground">Bảng tin</p>
          </div>
          <Bell className="size-5 cursor-pointer text-muted-foreground hover:text-foreground" />
        </div>
        <div className="space-y-4">
          {placeholderPosts.map((post) => (
            <div
              className="rounded-xl border bg-card p-6 shadow-sm"
              key={post.id}
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-sm">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name || "User"}</p>
                  <p className="text-muted-foreground text-xs">2 giờ trước</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bài viết mới về chăm sóc ngựa. Nhấn để xem thêm nội dung chi
                tiết!
              </p>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
