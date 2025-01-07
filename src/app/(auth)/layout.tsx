// Whatever goes in this file only applies to /login and /signup 
// This is because it is a child of the (auth) folder and applies to all routes within that folder

import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}