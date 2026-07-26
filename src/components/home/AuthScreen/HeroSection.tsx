import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="background-noise pointer-events-none fixed inset-0 z-50 opacity-[0.035]" />

      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <div className="flex flex-1 flex-col items-start justify-center bg-[#00B0F0A6] px-6 pt-24 pb-12 sm:px-10 lg:px-20">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Image
              alt="OnlyHorse"
              className="mb-10"
              height={48}
              priority
              src="/hero/logo.svg"
              width={160}
            />
            <h1 className="text-balance font-bold text-4xl text-white leading-tight md:text-5xl lg:text-6xl">
              Chia Sẻ Nội Dung Ngựa Cao Cấp
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/75">
              Xem video cưỡi ngựa cao cấp, khám phá mẹo chăm sóc ngựa và truy
              cập nội dung độc quyền từ những người sáng tạo hàng đầu.
            </p>
            <Button
              className="mt-10 rounded-full bg-white px-8 text-[#00B0F0] hover:bg-white/90"
              size="lg"
            >
              Tham Gia Ngay
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0 z-0">
            <Image
              alt=""
              aria-hidden
              className="object-cover opacity-40 blur-sm"
              fill
              sizes="50vw"
              src="/hero/horse-bg.png"
            />
          </div>
          <div className="relative z-10 h-full min-h-[50vh] lg:min-h-full">
            <Image
              alt="Nội dung ngựa cao cấp"
              className="object-contain p-4 lg:object-cover lg:p-0"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/hero/horse.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
