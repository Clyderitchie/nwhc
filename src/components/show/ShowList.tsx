"use client";

import { FindAllShows } from "@/app/(main)/shows/actions";
import { ShowData } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ShowList() {
  const [shows, setShows] = useState<ShowData[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchedShows = async () => {
      try {
        const everyShow = await FindAllShows();
        setShows(everyShow);
      } catch (error) {
        console.error("Failed to fetch all shows");
      }
    };
    fetchedShows();
  }, []);

  const filteredShows = shows.filter((show) =>
    show.showName.toLocaleLowerCase().includes(query)
  );

  return (
    <>
      <div className="my-8 flex max-h-full min-h-full min-w-full max-w-full flex-wrap items-start justify-around gap-4 border md:flex-row">
        {filteredShows.map((show) => (
          <div className="min-h-24 w-full border md:w-1/4" key={show.id}>
            <Link href={`/shows/${show.id}`}>
              <div className="flex-col items-baseline p-5">
                <h1>{show.showName}</h1>
                <Image
                  className="rounded-sm"
                  src={show.flyerLink || "/default-image.png"}
                  alt={show.showName}
                  width={100}
                  height={75}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
