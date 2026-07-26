import Image from "next/image";
import { UnderlinedText } from "@/components/decorators";
import { testimonials } from "@/components/home/AuthScreen/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";

function TestimonialCard({
  name,
  role,
  body,
  image,
}: {
  name: string;
  role: string;
  body: string;
  image: string;
}) {
  return (
    <Card className="flex w-80 shrink-0 flex-col rounded-2xl shadow-md">
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div className="flex items-center gap-3">
          <Image
            alt={name}
            className="rounded-full object-cover"
            height={44}
            src={image}
            width={44}
          />
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-muted-foreground text-xs">{role}</p>
          </div>
        </div>
        <p className="mt-4 flex-1 text-muted-foreground text-sm leading-relaxed">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-20">
      <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
        Người Dùng Nói Gì Về <UnderlinedText>OnlyHorse</UnderlinedText>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Hàng ngàn người yêu ngựa đã tin tưởng và tham gia cộng đồng của chúng
        tôi
      </p>
      <div className="-mx-2 space-y-6 px-2">
        <Marquee className="py-2" pauseOnHover>
          {row1.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee className="py-2" pauseOnHover reverse>
          {row2.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
