"use client";

import { Loader2, Send, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createPostAction } from "@/actions/posts/createPostAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { postSchema, validateFileSize } from "@/lib/validation";

export default function ContentTab({
  onPendingChange,
}: {
  onPendingChange: (pending: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const sizeError = validateFileSize(f);
    if (sizeError) {
      toast.error(sizeError);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErrors((prev) => ({ ...prev, mediaUrl: "" }));
  }

  function handleRemoveFile() {
    setFile(null);
    setPreview("");
    URL.revokeObjectURL(preview);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = postSchema.safeParse({
      caption,
      fileSize: file?.size,
      isPublic,
      mediaUrl: file ? "provided" : "",
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setPending(true);
    onPendingChange(true);
    try {
      const formData = new FormData();
      formData.set("caption", caption);
      formData.set("isPublic", String(isPublic));
      if (file) formData.set("media", file);
      await createPostAction(formData);
      toast.success("Đã đăng bài thành công");
      setCaption("");
      handleRemoveFile();
      setIsPublic(false);
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      onPendingChange(false);
      setPending(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Tạo bài viết mới</CardTitle>
          <CardDescription>Đăng nội dung lên trang chủ</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="caption">Nội dung</Label>
              <Input
                className={pending ? "opacity-50" : undefined}
                disabled={pending}
                id="caption"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Nhập nội dung bài viết..."
                value={caption}
              />
              {errors.caption && (
                <p className="text-destructive text-sm">{errors.caption}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Media</Label>
              <input
                accept="image/*,video/*"
                className="hidden"
                disabled={pending}
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
              />
              {preview ? (
                <div className="relative overflow-hidden rounded-lg">
                  {file?.type.startsWith("video/") ? (
                    <video
                      className="max-h-64 w-full object-cover"
                      controls
                      src={preview}
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    <Image
                      alt="Preview"
                      className="max-h-64 w-full object-cover"
                      height={450}
                      src={preview}
                      unoptimized
                      width={800}
                    />
                  )}
                  <Button
                    className={cn(
                      "absolute top-2 right-2",
                      pending && "pointer-events-none opacity-50",
                    )}
                    disabled={pending}
                    onClick={handleRemoveFile}
                    size="icon"
                    type="button"
                    variant="destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  className={pending ? "opacity-50" : undefined}
                  disabled={pending}
                  onClick={() => fileRef.current?.click()}
                  type="button"
                  variant="outline"
                >
                  <Upload className="mr-2 size-4" />
                  Chọn file
                </Button>
              )}
              {errors.mediaUrl && (
                <p className="text-destructive text-sm">{errors.mediaUrl}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={isPublic}
                className={pending ? "opacity-50" : undefined}
                disabled={pending}
                id="isPublic"
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="isPublic">Công khai</Label>
            </div>

            <Button disabled={pending} type="submit">
              {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {pending ? (
                "Đang đăng..."
              ) : (
                <>
                  <Send className="mr-2 size-4" /> Đăng bài
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
