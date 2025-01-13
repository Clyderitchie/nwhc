"use client"

import BandList from "@/components/band/BandList";

export default function Bands() {

    return (
        <>              
        <div className="border flex justify-center items-start min-h-screen max-h-screen min-w-full max-w-full">
              <BandList />
        </div>
        </>
    )
}