import { notFound } from "next/navigation";
import { getBand } from "../actions";
import Image from "next/image";
import BandLinks from "@/components/band/BandLinks";

interface PageProps {
  params: { id: string };
}

export default async function BandPage({ params: { id } }: PageProps) {
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
              <div className="my-5 mt-2 min-h-fit  flex justify-between items-baseline border px-2">
               <div>
               <h1 className="mb-5 text-3xl font-bold underline">
                  {band.bandName}
                </h1>
                <div className="rounded-sm">
                  {band.bandPic && (
                    <Image
                      className="rounded-lg"
                      src={band.bandPic}
                      alt={band.bandName}
                      width={250}
                      height={200}
                      style={{ objectFit: 'cover', width: '250px', height: '200px'}}
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
              </div>
              <div className="my-5">{band.bandBio} Band bio in this div</div>
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}
