import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/app/(protected)/dashboard/_components/sign-out-button";
import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <div>
      {JSON.stringify(session?.user)}
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
