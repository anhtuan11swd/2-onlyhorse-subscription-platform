"use client";

import { Bell } from "lucide-react";
import BaseLayout from "@/components/layout/BaseLayout";
import Feed from "@/components/post/Feed";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

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
        <Feed />
      </div>
    </BaseLayout>
  );
}
