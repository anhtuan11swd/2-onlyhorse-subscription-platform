"use client";

import { useEffect, useState } from "react";
import { getPostsAction } from "@/actions/posts/getPostsAction";
import type { FeedPost } from "@/actions/posts/post-types";
import PostCard from "@/components/post/PostCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Feed() {
  const [data, setData] = useState<{
    posts: FeedPost[];
    subscribed: boolean;
    currentUserId: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsAction().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {["sk1", "sk2", "sk3"].map((id) => (
          <div className="rounded-xl border bg-card p-4" key={id}>
            <div className="mb-3 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="mb-3 h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-4xl">🐴</p>
        <p className="mt-4 font-medium text-lg">Chưa có bài viết nào</p>
        <p className="text-muted-foreground text-sm">Quay lại sau nhé!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.posts.map((post) => (
        <PostCard
          currentUserId={data.currentUserId || ""}
          key={post.id}
          post={post}
          subscribed={data.subscribed}
        />
      ))}
    </div>
  );
}
