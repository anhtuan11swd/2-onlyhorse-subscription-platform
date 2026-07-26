import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ModeToggle from "@/components/mode-toggle";
import ThemeProvider from "@/components/providers/theme-provider";
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
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
        <Toaster duration={2000} position="top-center" />
      </body>
    </html>
  );
}
