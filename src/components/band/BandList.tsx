"use client";

import { FindAllBands } from "@/app/(main)/bands/actions";
import { BandData } from "@/lib/types";
import { useEffect, useState } from "react";
import BandDelete from "./DeleteBand";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function BandList() {
  const [bands, setBands] = useState<BandData[]>([]);
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

  return (
    <>
      <div className="my-8 flex flex-wrap md:flex-row max-h-full min-h-full min-w-full max-w-full items-start justify-around gap-4">
        {filteredBands.map((band) => (
          <div className="min-h-24 w-full md:w-1/4" key={band.id}>
            <Link className="" href={`/bands/${band.id}`}>
              <div className="flex-col items-baseline p-5">
                <h1 className="my-1 text-left text-2xl">{band.bandName}</h1>
                <Image
                  className="rounded-sm"
                  src={band.bandPic || "/default-image.png"}
                  alt={band.bandName}
                  width={100}
                  height={75}
                />
              </div>
            </Link>
            <div className="justify-end align-baseline hidden md:flex ">
              <BandDelete bandId={band.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
