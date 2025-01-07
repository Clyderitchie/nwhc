"use client";

// import NavMenu from "@/components/NavMenu";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <main className="flex h-full w-full min-w-0 gap-5">
        <div className={`w-full min-w-0 space-y-5`}>
          <h1 className="text-center text-3xl">
           Welcome
          </h1>
        </div>
      </main>
    </>
  );
}
