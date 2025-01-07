// Whatever goes in this file only applies to /login and /signup
// This is because it is a child of the (auth) folder and applies to all routes within that folder

import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import ClientLayout from "@/components/ClientLayout";
import { validateRequest } from "@/auth";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await validateRequest(); // Fetches Session

  // if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session || { user: null, session: null }}>
      <ClientLayout>{children}</ClientLayout>
    </SessionProvider>
  ); // Makes Sessions content available to all children so you do not have to fetch there for it.
};

export default Layout;


