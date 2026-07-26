"use client";

import { Check, Info, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateUserProfileAction } from "@/actions/user/updateUserProfileAction";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { profileSchema } from "@/lib/validation";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export default function UpdateProfileForm({ user }: { user: User }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.image || "");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErrors((prev) => ({ ...prev, image: "" }));
  }

  function handleRemoveFile() {
    setFile(null);
    setPreview(user.image || "");
    URL.revokeObjectURL(preview);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = profileSchema.safeParse({ name });
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
    try {
      const formData = new FormData();
      formData.set("name", name.trim());
      if (file) formData.set("image", file);
      await updateUserProfileAction(formData);
      toast.success("Cập nhật thành công");
      setFile(null);
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setPending(false);
    }
  }

  return (
    <TooltipProvider>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Cập nhật hồ sơ</CardTitle>
          <CardDescription>
            Thay đổi tên hiển thị và ảnh đại diện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image
                  alt="Avatar"
                  className="object-cover"
                  fill
                  src={preview || "/user-placeholder.png"}
                />
              </div>
              <input
                accept="image/*"
                className="hidden"
                disabled={pending}
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
              />
              <div className="flex gap-2">
                <Button
                  className={pending ? "opacity-50" : undefined}
                  disabled={pending}
                  onClick={() => fileRef.current?.click()}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Upload className="mr-2 size-4" />
                  Đổi ảnh
                </Button>
                {file && (
                  <Button
                    className={cn(pending && "pointer-events-none opacity-50")}
                    disabled={pending}
                    onClick={handleRemoveFile}
                    size="sm"
                    type="button"
                    variant="destructive"
                  >
                    <Trash2 className="mr-2 size-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên hiển thị</Label>
              <Input
                className={pending ? "opacity-50" : undefined}
                disabled={pending}
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyen Van A"
                value={name}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Email không thể thay đổi vì lý do bảo mật
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                className="opacity-50"
                disabled
                id="email"
                value={user.email}
              />
            </div>

            <Button className="w-full" disabled={pending} type="submit">
              {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {pending ? (
                "Đang lưu..."
              ) : (
                <>
                  <Check className="mr-2 size-4" /> Lưu thay đổi
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
