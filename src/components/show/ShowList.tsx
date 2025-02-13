"use client";

import { FindAllShows } from "@/app/(main)/shows/actions";
import { ShowData } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ShowDelete from "./DeleteShow";
import { useSession } from "@/app/(main)/SessionProvider";
import ShowInfo from "./ShowInfo";
import ShowLinks from "./ShowLink";

const ITEMS_PER_PAGE = 9;

export default function ShowList() {
  const { user } = useSession() || { user: null };
  const [shows, setShows] = useState<ShowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    show.showName.toLocaleLowerCase().includes(query),
  );

  const sortedShows = filteredShows.sort((a, b) =>
    a.showName.localeCompare(b.showName),
  );

  const totalPages = Math.ceil(sortedShows.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedShows = filteredShows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="my-8 flex max-h-full min-h-full min-w-full max-w-full flex-wrap items-start justify-around gap-4 md:flex-row">
        {displayedShows.map((show) => (
          <div
            className="flex max-h-64 min-h-64 w-fit items-center justify-center rounded-md border bg-card shadow-xl md:w-1/4"
            key={show.id}
          >
            {/* <Link href={`/shows/${show.id}`}> */}
            <div className="flex-col items-baseline p-5">
              <h1 className="my-1 text-left text-2xl">{show.showName}</h1>
              <Image
                className="rounded-sm"
                src={show.flyerLink || "/default-image.png"}
                alt={show.showName}
                width={100}
                height={75}
              />
              <div className="my-2 flex justify-between">
                <div>
                  <ShowLinks links={show.link || []} />
                </div>
                <div>
                  <ShowInfo
                    showName={show.showName}
                    showInfo={show.showInfo}
                    showTime={show.showTime}
                    showLocation={show.showLocation}
                  />
                </div>
              </div>
            </div>
            {user ? (
              <div className="hidden justify-end align-baseline md:flex">
                <ShowDelete showId={show.id} />
              </div>
            ) : (
              <span></span>
            )}
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
