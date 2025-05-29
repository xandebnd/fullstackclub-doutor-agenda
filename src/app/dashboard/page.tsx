import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "../../lib/auth";
import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      {JSON.stringify(session?.user)}
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
