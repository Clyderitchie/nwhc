"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import power from "@/app/assets/power hero pic.jpg";

export default function HomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ maxWidth: "100%", minWidth: "100%", height: "300px" }}
        >
          <div className="absolute left-0 top-[-66px] h-[45vh] w-full">
            <Image
              src={power}
              alt="Power live"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className={`rounded-md shadow-lg transition-opacity duration-1000 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <main className="max-h-screen w-full min-w-0 flex-col items-start gap-5">
          <div
            className={`h-fit w-full min-w-0 space-y-5 ${fadeIn ? "fade-in" : ""}`}
          >
            <div className="border">TESTING</div>
          </div>
          <style jsx>{`
            .fade-in {
              animation: fadeInAnimation 3s ease-in;
            }

            @keyframes fadeInAnimation {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </main>
      </div>
    </>
  );
}
