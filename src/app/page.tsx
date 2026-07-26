import AuthScreen from "@/components/home/AuthScreen";
import HomeScreen from "@/components/home/HomeScreen";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <AuthScreen />;
  }

  const user = await prisma.user.findUnique({
    select: { email: true, id: true, image: true, name: true },
    where: { id: session.userId },
  });

  if (!user) {
    return <AuthScreen />;
  }

  return <HomeScreen user={user} />;
}
