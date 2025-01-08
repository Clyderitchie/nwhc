"use client";

import { FindAllBands } from "@/app/(main)/bands/actions";
import { BandData } from "@/lib/types";
import { useEffect, useState } from "react";
import BandDelete from "./DeleteBand";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
      <div className="max-h-full min-h-full">
        {filteredBands.map((band) => (
          <li key={band.id}>
            <Link href={`/bands/${band.id}`}>
            <h1>{band.bandName}</h1>
            <div><BandDelete bandId={band.id}/></div>
            </Link>
           
          </li>
        ))}
      </div>
    </>
  );
}
