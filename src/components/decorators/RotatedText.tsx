import { cn } from "@/lib/utils";

interface RotatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function RotatedText({ children, className }: RotatedTextProps) {
  return (
    <span
      className={cn(
        "inline-block rotate-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground text-sm uppercase tracking-wide shadow-md",
        className,
      )}
    >
      {children}
    </span>
  );
}
