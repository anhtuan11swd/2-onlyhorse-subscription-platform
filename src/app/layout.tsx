import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  description: "Nền tảng chia sẻ nội dung ngựa cao cấp",
  title: "OnlyHorse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
      lang="vi"
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster duration={2000} position="top-center" />
      </body>
    </html>
  );
}
