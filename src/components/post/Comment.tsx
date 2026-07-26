import Image from "next/image";

export default function Comment({
  name,
  image,
  content,
  createdAt,
}: {
  name: string | null;
  image: string | null;
  content: string;
  createdAt: Date;
}) {
  return (
    <div className="flex gap-3">
      <Image
        alt={name || "User"}
        className="h-8 w-8 rounded-full object-cover"
        height={32}
        src={image || "/user-placeholder.png"}
        width={32}
      />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">{name || "User"}</span>
          <span className="text-muted-foreground text-xs">
            {new Date(createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{content}</p>
      </div>
    </div>
  );
}
