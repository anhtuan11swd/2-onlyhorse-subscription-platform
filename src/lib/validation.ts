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

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
