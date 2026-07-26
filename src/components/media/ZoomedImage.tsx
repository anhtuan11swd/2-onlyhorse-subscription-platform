"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ZoomedImageProps {
  alt: string;
  className?: string;
  src: string;
}

export default function ZoomedImage({ src, alt, className }: ZoomedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("50% 50%");
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setOrigin("50% 50%");
      }}
      onMouseMove={handleMouseMove}
      ref={ref}
      role="img"
    >
      <Image
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500"
        height={600}
        src={src}
        style={{
          transform: hovered ? "scale(2)" : "scale(1)",
          transformOrigin: origin,
        }}
        width={800}
      />
    </div>
  );
}
