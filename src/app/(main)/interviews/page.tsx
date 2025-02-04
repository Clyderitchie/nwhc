"use client";

import InterviewList from "@/components/interview/interviewList";

export default function Interview() {
  return (
    <>
      <div
        className="flex max-h-screen min-h-screen min-w-full items-start justify-center"
        style={{ maxWidth: "87%", minWidth: "87%" }}
      >
        <InterviewList />
      </div>
    </>
  );
}
