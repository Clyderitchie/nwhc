"use client";
import { notFound } from "next/navigation";
import { getBand } from "../actions";
import Image from "next/image";
import BandLinks from "@/components/band/BandLinks";
import BandDelete from "@/components/band/DeleteBand";
import { useSession } from "@/app/(main)/SessionProvider";
import { useState } from "react";


interface PageProps {
  params: { id: string };
}

export default async function BandPage({ params: { id } }: PageProps) {
  const { user } = useSession() || { user: null };

  const band = await getBand(id);
  if (!band) {
    notFound();
  }

  console.log("Band from Id and bandPage function: ", band);

  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className="min-w-full">
          {band ? (
            <div className="min-h-screen flex-col">
              <div className="my-5 mt-2 flex min-h-fit items-baseline justify-between px-2">
                <div>
                  <h1 className="mb-5 text-3xl font-bold underline">
                    {band.bandName}
                  </h1>
                  <div className="my-5 rounded-sm">
                    {band.bandPic && (
                      <Image
                        className="rounded-lg"
                        src={band.bandPic}
                        alt={band.bandName}
                        width={250}
                        height={200}
                        style={{
                          objectFit: "cover",
                          width: "250px",
                          height: "200px",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="">
                <BandLinks links={band.link || []} /> 
                </div>
                {user ? <BandDelete bandId={band.id} /> : <span></span>}
              </div>
              <div className="my-5">{band.bandBio}</div>
             
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}


