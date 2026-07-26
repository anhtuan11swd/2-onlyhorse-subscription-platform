import { redirect } from "next/navigation";
import BaseLayout from "@/components/layout/BaseLayout";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    select: { email: true, id: true, image: true, name: true },
    where: { id: session.userId },
  });
  if (!user) redirect("/");

  return (
    <BaseLayout renderRightPanel={false}>
      <div className="mx-auto max-w-lg px-4 py-8">
        <UpdateProfileForm user={user} />
      </div>
    </BaseLayout>
  );
}
