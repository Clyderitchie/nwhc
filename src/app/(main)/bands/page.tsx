"use client";

import BandList from "@/components/band/BandList";

export default function Bands() {
  return (
    <>
      <div className="flex max-h-screen min-h-screen min-w-full max-w-full items-start justify-center">
        <BandList />
      </div>
    </>
  );
}
