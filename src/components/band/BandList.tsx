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
      <div className="my-8 flex max-h-full min-h-full items-start justify-between gap-4">
        {filteredBands.map((band) => (
          <div className="min-h-24 min-w-56" key={band.id}>
            <Link className="" href={`/bands/${band.id}`}>
              <div className="items-between flex-col items-baseline">
                <h1 className="text-left text-2xl">{band.bandName}</h1>
                <Image
                  src={band.bandPic || "/default-image.png"}
                  alt={band.bandName}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-end align-baseline">
                <BandDelete bandId={band.id} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
