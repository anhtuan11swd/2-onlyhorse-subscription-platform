"use client";

import { Heart, LockKeyhole, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { commentOnPostAction } from "@/actions/posts/commentOnPostAction";
import { likePostAction } from "@/actions/posts/likePostAction";
import type { FeedPost } from "@/actions/posts/post-types";
import CommentComponent from "@/components/post/Comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function PostCard({
  post,
  subscribed,
  currentUserId,
}: {
  post: FeedPost;
  subscribed: boolean;
  currentUserId: string;
}) {
  const isLiked = post.likes.some((l) => l.userId === currentUserId);
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(
    post._count?.likes ?? post.likes.length,
  );
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);
  const locked = !post.isPublic && !subscribed && post.userId !== currentUserId;

  async function handleLike() {
    setLiked(!liked);
    setLikesCount((c) => (liked ? c - 1 : c + 1));
    try {
      const res = await likePostAction(post.id);
      if (!res.liked) {
        setLiked(false);
        setLikesCount((c) => c - 1);
      }
    } catch {
      setLiked(isLiked);
      setLikesCount(post._count?.likes ?? post.likes.length);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommenting(true);
    try {
      const res = await commentOnPostAction(post.id, commentText);
      setComments((prev) => [res.comment, ...prev]);
      setCommentText("");
      toast.success("Đã gửi bình luận");
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setCommenting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="relative">
        {post.mediaUrl && (
          <div className={cn("relative", locked && "blur-xl")}>
            {post.mediaType?.startsWith("video/") ? (
              <video
                className="w-full rounded-t-xl"
                controls
                src={post.mediaUrl}
              >
                <track kind="captions" />
              </video>
            ) : (
              <Image
                alt={post.caption || ""}
                className="w-full rounded-t-xl object-cover"
                height={450}
                src={post.mediaUrl}
                width={800}
              />
            )}
          </div>
        )}

        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-t-xl bg-background/60 backdrop-blur-sm">
            <div className="absolute inset-0 bg-onlyfans" />
            <LockKeyhole className="relative z-10 size-8 text-muted-foreground" />
            <p className="relative z-10 font-medium text-sm">
              Nội dung Premium
            </p>
            <Button onClick={() => (window.location.href = "/")} size="sm">
              Subscribe để xem
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.image || "/user-placeholder.png"} />
            <AvatarFallback>{post.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{post.user.name || "User"}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {post.caption && (
          <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
            {post.caption}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={handleLike}
            type="button"
          >
            <Heart
              className={cn("size-5", liked && "fill-red-500 text-red-500")}
            />
            <span>{likesCount}</span>
          </button>

          <Dialog disablePointerDismissal>
            <DialogTrigger className="flex cursor-pointer items-center gap-1 text-sm">
              <MessageCircle className="size-5" />
              <span>{comments.length}</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bình luận</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {comments.length === 0 && (
                    <p className="py-8 text-center text-muted-foreground text-sm">
                      Chưa có bình luận nào.
                    </p>
                  )}
                  {comments.map((c) => (
                    <CommentComponent
                      content={c.content}
                      createdAt={c.createdAt}
                      image={c.user.image}
                      key={c.id}
                      name={c.user.name}
                    />
                  ))}
                </div>
              </ScrollArea>
              <form className="flex gap-2" onSubmit={handleComment}>
                <Input
                  disabled={commenting}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Viết bình luận..."
                  value={commentText}
                />
                <Button disabled={commenting} size="icon" type="submit">
                  <Send className="size-4" />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
