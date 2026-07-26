import { cn } from "@/lib/utils";

interface UnderlinedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function UnderlinedText({
  children,
  className,
}: UnderlinedTextProps) {
  return <span className={cn("font-semibold", className)}>{children}</span>;
}
