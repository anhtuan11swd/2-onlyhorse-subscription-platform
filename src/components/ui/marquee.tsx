import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  pauseOnHover?: boolean
  reverse?: boolean
}

export default function Marquee({
  children,
  className,
  pauseOnHover,
  reverse,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex gap-4 overflow-hidden",
        "[--duration:40s]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-stretch justify-around gap-4",
          "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-stretch justify-around gap-4",
          "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}
