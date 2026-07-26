import type { Prisma } from "@prisma/client";

export const postInclude = {
  _count: { select: { comments: true, likes: true } },
  comments: {
    include: { user: { select: { id: true, image: true, name: true } } },
    orderBy: { createdAt: "desc" as const },
  },
  likes: { select: { id: true, userId: true } },
  user: { select: { id: true, image: true, name: true } },
} as const;

export type FeedPost = Prisma.PostGetPayload<{ include: typeof postInclude }>;
