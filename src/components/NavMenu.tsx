"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface NavMenuProps {
  className?: string;
}

export default function NavMenu({ className }: NavMenuProps) {
  const { user } = useSession();
  const [isPopoverTopOpen, setIsPopoverTopOpen] = useState(false);

  const handleClick = () => {
    setIsPopoverTopOpen(true);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="fixed bottom-4 right-0 hidden md:flex items-center justify-between px-8 py-3 m-3">
            <Menu onClick={handleClick} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-w-fit mx-4 p-1">
          <div className="flex flex-col items-center">
            <Link href="/shows">
              <h3 className="py-2">Shows</h3>
            </Link>
            <Link href="/bands">
              <h3 className="py-2">Bands</h3>
            </Link>
            <Link href="/interviews">
              <h3 className="py-2">Interviews</h3>
            </Link>
            <Link href="/projects">
              <h3 className="py-2">Other NWHC Projects</h3>
            </Link>
            <Link href="/contact">
              <h3 className="py-2">Contact</h3>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
