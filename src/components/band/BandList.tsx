"use client";

import { FindAllBands } from "@/app/(main)/bands/actions";
import { BandData } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BanIcon } from "lucide-react";
import BandLinks from "./BandLinks";
import BandIno from "./BandInfo";
import BandInfo from "./BandInfo";


const ITEMS_PER_PAGE = 9;

export default function BandList() {
  const [bands, setBands] = useState<BandData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchedBands = async () => {
      try {
        const everyBand = await FindAllBands();
        setBands(everyBand);
      } catch (error) {
        console.error("Failed to fetch bands");
      }
    };
    fetchedBands();
  }, []);

  const filteredBands = bands.filter((band) =>
    band.bandName.toLocaleLowerCase().includes(query),
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

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="my-8 flex max-h-full min-h-full min-w-full max-w-full flex-wrap items-start justify-around gap-4 md:flex-row">
        {displayedBands.map((band) => (
          <div
            className="max-h-72 min-h-72 w-full rounded-md border bg-card shadow-xl md:w-1/4"
            key={band.id}
          >
            {/* <Link className="" href={`/bands/${band.id}`}> */}
              <div className="flex-col items-baseline p-5">
                <h1 className="my-1 text-left text-2xl">{band.bandName}</h1>
                <Image
                  className="rounded-sm"
                  src={band.bandPic || "/default-image.png"}
                  alt={band.bandName}
                  width={100}
                  height={75}
                />
                <h2 className="my-2">Origin: {band.bandOrigin}</h2>
                <h3 className="my-2">Years Active: {band.bandYearsActive}</h3>
                <h4 className="my-2"><BandLinks links={band.link || []}/> <BandInfo bandName={band.bandName} bandBio={band.bandBio} bandPic={band.bandPic} bandOrigin={band.bandOrigin} bandActive={false} bandYearsActive={band.bandYearsActive} link={[]}/></h4>
                <h5></h5>
              </div>
            {/* </Link> */}

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

