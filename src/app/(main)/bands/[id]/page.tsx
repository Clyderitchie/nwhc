import { notFound } from "next/navigation";
import { getBand } from "../actions";
import Image from "next/image";

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
      <div className="min-h-screen w-full">
        <div className="w-full">
          {band ? (
            <div className="min-h-screen flex-col">
              <div className="my-5 min-h-fit border">
                {band.bandName}
                {band.bandPic && (
                  <Image
                    src={band.bandPic}
                    alt={band.bandName}
                    width={200}
                    height={300}
                  />
                )}
              </div>
              <div className="my-5 border">
                {band.bandBio} Band bio in this div
              </div>
              <div className="my-5 border">Any band media in this div</div>
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}
