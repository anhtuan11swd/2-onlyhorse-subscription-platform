import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";
import BaseLayout from "@/components/layout/BaseLayout";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (user?.role !== "admin") redirect("/");

  return (
    <BaseLayout renderRightPanel={false}>
      <DashboardClient />
    </BaseLayout>
  );
}
