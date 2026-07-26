"use server";

import { type FeedPost, postInclude } from "@/actions/posts/post-types";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getPostsAction() {
  const session = await getSession();
  if (!session) return { currentUserId: null, posts: [], subscribed: false };

  const user = await prisma.user.findUnique({
    select: { id: true, isSubscribed: true },
    where: { id: session.userId },
  });
  if (!user) return { currentUserId: null, posts: [], subscribed: false };

  const posts = await prisma.post.findMany({
    include: postInclude,
    orderBy: { createdAt: "desc" },
  });

  return {
    currentUserId: user.id,
    posts: posts as unknown as FeedPost[],
    subscribed: user.isSubscribed,
  };
}
