"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/(main)/NavBar";
import NavMenu from "./NavMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showMenuBar, setShowMenuBar] = useState(false);
  useEffect(() => {
    if (pathname.startsWith("/customers/")) {
      setShowMenuBar(true);
    } else {
      setShowMenuBar(false);
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar  />
      <div className="mx-auto mt-2 flex w-full max-w-7xl grow items-center justify-center gap-5 p-5">
        {children}
      </div>
      <div className=" max-h-fit min-h-full min-w-0 max-w-fit">
          <NavMenu />
        </div>
    </div>
  );
}
