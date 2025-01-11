"use client";

import { FindAllShows } from "@/app/(main)/shows/actions";
import { ShowData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ShowList() {
  const [shows, setShows] = useState<ShowData[]>([]);

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
    show.showName.toLocaleLowerCase(),
  );

  return (
    <>
    <div className="max-h-full min-h-full">
        {filteredShows.map((show) => (
            <li key={show.id}>
                <h1>{show.showName}</h1>
            </li>
        ))}
    </div>
    </>
  )
}
