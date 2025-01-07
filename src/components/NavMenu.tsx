"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";

interface NavMenuProps {
  className?: string;
}

export default function NavMenu({ className }: NavMenuProps) {
  const { user } = useSession();

  return (
    <>
      <div className="fixed bottom-0 right-0 px-8 py-3">
        <div className="flex-col items-center">
          <Link href="/shows">
            <h3 className="py-5">Shows</h3>
          </Link>
          <Link href="/bands">
            <h3 className="py-5">Bands</h3>
          </Link>
          <Link href="/media">
            <h3 className="py-5">Media</h3>
          </Link>
          <Link href="/projects">
            <h3 className="py-5">Other NWHC Projects</h3>
          </Link>
          <Link href="/contact">
            <h3 className="py-5">Contact</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
