import Image from "next/image";
import { UnderlinedText } from "@/components/decorators";
import { features } from "@/components/home/AuthScreen/data/features";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-20">
      <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
        Tính Năng <UnderlinedText>Nổi Bật</UnderlinedText>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Khám phá những tính năng độc đáo chỉ có tại OnlyHorse
      </p>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            key={feature.title}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                alt={feature.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                src={feature.image}
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{feature.title}</CardTitle>
                <Badge
                  className="transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  variant="secondary"
                >
                  {feature.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
