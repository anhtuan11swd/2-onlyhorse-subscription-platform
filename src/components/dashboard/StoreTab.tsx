"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { addNewProductToStoreAction } from "@/actions/products/addNewProductToStoreAction";
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
import { cn } from "@/lib/utils";
import { productSchema, validateFileSize } from "@/lib/validation";

export default function StoreTab({
  onPendingChange,
}: {
  onPendingChange: (pending: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
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
    setErrors((prev) => ({ ...prev, imageUrl: "" }));
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

    const result = productSchema.safeParse({
      fileSize: file?.size,
      imageUrl: file ? "provided" : "",
      name,
      price,
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
      formData.set("name", name);
      formData.set("price", price);
      if (file) formData.set("image", file);
      await addNewProductToStoreAction(formData);
      toast.success("Đã thêm sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setName("");
      setPrice("");
      handleRemoveFile();
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
          <CardTitle>Thêm sản phẩm mới</CardTitle>
          <CardDescription>
            Giá nhập theo VND, tự động chuyển đổi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input
                className={pending ? "opacity-50" : undefined}
                disabled={pending}
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Áo thun OnlyHorse"
                value={name}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá (VND)</Label>
              <Input
                className={pending ? "opacity-50" : undefined}
                disabled={pending}
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="199000"
                type="number"
                value={price}
              />
              {errors.price && (
                <p className="text-destructive text-sm">{errors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Ảnh sản phẩm</Label>
              <input
                accept="image/*"
                className="hidden"
                disabled={pending}
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
              />
              {preview ? (
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    alt="Preview"
                    className="max-h-64 w-full object-cover"
                    height={450}
                    src={preview}
                    unoptimized
                    width={800}
                  />
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
                  Chọn ảnh
                </Button>
              )}
              {errors.imageUrl && (
                <p className="text-destructive text-sm">{errors.imageUrl}</p>
              )}
            </div>
            <Button disabled={pending} type="submit">
              {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
              <Plus className="mr-2 size-4" />
              {pending ? "Đang thêm..." : "Thêm sản phẩm"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
