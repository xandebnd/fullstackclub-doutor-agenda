import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "../lib/auth";

export const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  } else {
    redirect("/dashboard");
  }
};
