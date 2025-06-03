import { redirect } from "next/navigation";

export const Home = async () => {
  redirect("/dashboard");
};
