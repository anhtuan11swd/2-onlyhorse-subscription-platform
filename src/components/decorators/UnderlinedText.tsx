import { LineSquiggle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnderlinedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function UnderlinedText({
  children,
  className,
}: UnderlinedTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <LineSquiggle
        className="absolute -bottom-1.5 left-0 w-full text-current"
        strokeWidth={2}
      />
    </span>
  );
}
