import Link from "next/link";
import { useEffect, useState } from "react";

import { useSession } from "./SessionProvider";
import UserButton from "@/components/UserButton";

export default function Navbar() {
  const { user } = useSession() || { user: null };

  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div className="flex items-center justify-around px-2">
            <UserButton className="sm:ms-auto" />
        </div>
      </div>
    </header>
  );
}
