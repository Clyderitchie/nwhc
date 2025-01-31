"use client";
import { notFound } from "next/navigation";
import { getBand, UpdateBand } from "../actions";
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
  const [formData, setFormData] = useState({
    bandName: "",
    bandPic: "",
    bandBio: "",
    bandOrigin: "",
    bandActive: "",
    bandYearsActive: "",
    bandCampLink: "",
    bandAppleLink: "",
    bandSpotifyLink: "",
    bandOtherMusicLink: "",
    showName: "",
    flyerLink: "",
    showInfo: "",
    bandId: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const band = await getBand(id);
  if (!band) {
    notFound();
  }

//   console.log("Band from Id and bandPage function: ", band);

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
                  <BandLinks
                    bandCampLink={band.bandCampLink}
                    bandAppleLink={band.bandAppleLink}
                    bandSpotifyLink={band.bandSpotifyLink}
                    bandOtherMusicLink={band.bandOtherMusicLink}
                  />
                </div>
                {user ? <BandDelete bandId={band.id} /> : <span></span>}
              </div>
              <div className="my-5">{band.bandBio}</div>
              <div>{band.bandOrigin}</div>
              <div className="my-5">
                <h1 className="underline text-2xl my-3">Shows</h1>
                {band.show && band.show.length > 0 ? (
                  band.show.map((show) => (
                    <div key={show.id}>
                      <h2 className="text-xl font-semibold">{show.showName}</h2>
                    </div>
                  ))
                ) : (
                  <p>No shows found</p>
                )}
              </div>
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}


