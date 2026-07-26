import Image from "next/image";
import { UnderlinedText } from "@/components/decorators";
import { teamList } from "@/components/home/AuthScreen/data/team";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Team() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-20">
      <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
        Đội Ngũ <UnderlinedText>Phát Triển</UnderlinedText>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Những con người đam mê đứng sau OnlyHorse
      </p>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map((member) => (
          <Card
            className="group text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            key={member.name}
          >
            <CardHeader className="items-center justify-items-center">
              <Image
                alt={member.name}
                className="mx-auto rounded-full object-cover"
                height={80}
                src={member.image}
                width={80}
              />
              <CardTitle className="mt-2">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {member.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
