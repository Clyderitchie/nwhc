"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
    <div className="border mt-16"> <p>testing placement</p> </div>
      <main className="flex items-start h-full w-full min-w-0 gap-5">
        <div
          className={`h-fit w-full min-w-0 space-y-5 ${fadeIn ? "fade-in" : ""}`}
        >
          {/* <p className="text-center text-xl">
            The goal of this page is to have a localized place for everything
            encompassing the northwest NWHC scene. From a current show calendar,
            interviews with members of the NWHC scene and links to active and
            inactive bands, the hope is that this site can be tool to discover
            new bands, upcoming shows and more. If you have bands you would like
            added, please send a message to our instagram account
            @northwest_hardcore or email norwesthardcre4ever@gmail.com. We will
            do our best to update this site continuously on a regular basis.
            “This is our town, this is our scene, these are our rules…Get bent”
          </p> */}
          <div className="border">
            <p>testing placement</p>
          </div>
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
        {/* <div>Testing</div> */}
      </main>
    </>
  );
}
