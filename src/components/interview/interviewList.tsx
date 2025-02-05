"use client";

import { FindAllInterviews } from "@/app/(main)/interviews/actions";
import { InterviewData } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 9;

export default function InterviewList() {
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchedInterviews = async () => {
      try {
        const everyInterview = await FindAllInterviews();
        setInterviews(everyInterview);
      } catch (error) {
        console.error("Error fetching interviews: ", error);
      }
    };
    fetchedInterviews();
  }, []);

  const filteredInterviews = interviews.filter((interview) =>
    interview.title.toLocaleLowerCase().includes(query),
  );

  const sortedInterviews = filteredInterviews.sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const totalPages = Math.ceil(sortedInterviews.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedInterviews = filteredInterviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="my-8 flex max-h-full min-h-full min-w-full max-w-full flex-wrap items-start justify-around gap-4 md:flex-row">
        {displayedInterviews.map((interview) => (
          <div
            className="max-h-60 min-h-60 w-full rounded-md border bg-card shadow-xl md:w-1/4"
            key={interview.id}
          >
            <Link href={`/interviews/${interview.id}`}>
              <div className="flex-col items-baseline p-5">
                <h1 className="my-1 text-left text-2xl">{interview.title}</h1>
                <h2 className="my-2">Origin: {interview.content}</h2>
              </div>
            </Link>
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
