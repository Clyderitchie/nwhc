"use client";
// Make it so the bands that show are a random set of 9 bands that show 3 at a time and you can click through the pages of them. 
// Pages work just need to add in a random function to pick a random set of 9 each load. 
import { FindAllBands } from "@/app/(main)/bands/actions";
import { useEffect, useState } from "react";
import { BandData as BandDataType } from "@/lib/types";
import Image from "next/image";
import BandLinks from "./BandLinks";
import BandInfo from "./BandInfo";

const ITEMS_PER_PAGE = 3;

export interface BandFeatureProps {
  bandId: string;
  bandPic: string;
  bandBio: string;
  bandOrigin: string;
  bandYearsActive: string;
  appleMusic: string;
  spotifyMusic: string;
  bandCamp: string;
  twitter: string;
  instagram: string;
  shop: string;
}

export default function BandFeature({
  bandId,
  bandPic,
  bandBio,
  bandOrigin,
  bandYearsActive,
  appleMusic,
  spotifyMusic,
  bandCamp,
  twitter,
  instagram,
  shop,
}: BandFeatureProps) {
  const [bands, setBands] = useState<BandDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchedBands = async () => {
      try {
        const featuredBands = await FindAllBands();
        setBands(featuredBands);
      } catch (error) {
        console.error("Failed to fetch band for feature");
      }
    };
    fetchedBands();
  }, []);

  const filteredBands = bands.filter((band) =>
    band.bandName.toLocaleLowerCase(),
  );

  const sortedBands = filteredBands.sort((a, b) =>
    a.bandName.localeCompare(b.bandName),
  );

  const totalPages = Math.ceil(sortedBands.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedBands = filteredBands.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="my-4 flex max-h-fit min-h-fit min-w-full max-w-full flex-wrap items-start justify-around gap-4 md:flex-row">
        {displayedBands.map((band) => (
          <div
            className="flex max-h-56 min-h-56 w-fit items-center justify-center"
            key={band.id}
          >
            <div className="flex-col items-baseline p-5">
              <h1 className="my-1 text-left text-2xl">{band.bandName}</h1>
              <Image
                className="rounded-sm"
                src={band.bandPic || "/default-image.png"}
                alt={band.bandName}
                width={150}
                height={75}
              />
              <div className="my-2 flex justify-between">
                <div>
                  <BandLinks links={band.link || []} />
                </div>
                <div>
                  <BandInfo
                    bandName={band.bandName}
                    bandBio={band.bandBio}
                    bandOrigin={band.bandOrigin}
                    bandYearsActive={band.bandYearsActive}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-2 py-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
