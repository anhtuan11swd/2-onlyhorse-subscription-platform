import { z } from "zod";

const commonPasswords = [
  "password",
  "password1",
  "12345678",
  "123456789",
  "qwerty123",
  "abc123",
  "letmein",
  "welcome",
  "monkey",
  "dragon",
  "master",
  "admin123",
  "passw0rd",
  "password123",
];

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(100, "Tên không được vượt quá 100 ký tự")
  .regex(
    /^(?!\s*$)[\p{L}\p{M}\s'\-.]{2,100}$/u,
    "Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang, dấu nháy và dấu chấm",
  );

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email không được để trống")
  .email("Email không hợp lệ")
  .max(255, "Email không được vượt quá 255 ký tự");

export const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(64, "Mật khẩu không được vượt quá 64 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
  .regex(
    /[!@#$%^&*()_\-+=[\]{}|;:'",.<>?/~`]/,
    "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt",
  )
  .refine((val) => !/\s/.test(val), "Mật khẩu không được chứa khoảng trắng")
  .refine(
    (val) => !commonPasswords.includes(val.toLowerCase()),
    "Mật khẩu quá phổ biến, vui lòng chọn mật khẩu khác",
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export const signupSchema = z
  .object({
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    email: emailSchema,
    name: nameSchema.optional(),
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export function validateFileSize(file: File): string | null {
  if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
    return "Video không được vượt quá 50MB";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Ảnh không được vượt quá 4MB";
  }
  return null;
}

export const postSchema = z.object({
  caption: z
    .string()
    .min(1, "Vui lòng nhập nội dung bài viết")
    .max(500, "Nội dung không được vượt quá 500 ký tự"),
  fileSize: z
    .number()
    .max(MAX_VIDEO_SIZE, "File không được vượt quá 50MB")
    .optional(),
  isPublic: z.boolean(),
  mediaUrl: z.string().min(1, "Vui lòng tải media lên"),
});

export const productSchema = z.object({
  fileSize: z
    .number()
    .max(MAX_IMAGE_SIZE, "Ảnh không được vượt quá 4MB")
    .optional(),
  imageUrl: z.string().min(1, "Vui lòng tải ảnh sản phẩm"),
  name: z
    .string()
    .min(1, "Vui lòng nhập tên sản phẩm")
    .max(200, "Tên sản phẩm không được vượt quá 200 ký tự"),
  price: z
    .string()
    .min(1, "Vui lòng nhập giá sản phẩm")
    .refine(
      (v) => !Number.isNaN(Number(v)) && Number(v) >= 15000,
      "Giá tối thiểu là 15.000đ",
    ),
});

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không được để trống")
    .max(500, "Bình luận không được vượt quá 500 ký tự"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
