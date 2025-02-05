"use client";

import { notFound } from "next/navigation";
import { useSession } from "../../SessionProvider";
import { getInterview } from "../actions";

interface PageProps {
  params: { id: string };
}

export default async function InterviewPage({ params: { id } }: PageProps) {
  const { user } = useSession() || { user: null };

  const interview = await getInterview(id);
  if (!interview) {
    notFound();
  }

  console.log("Interview from page props id: ", interview);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="min-w-full">
          {interview ? (
            <div className="min-h-screen">
              <div className="my-5 mt-2 min-h-fit flex-col items-baseline justify-between px-2">
                <div>
                  <h1 className="mb-5 text-3xl font-bold underline">
                    {interview.title}
                  </h1>
                </div>
                <div className="my-5 rounded-sm">{interview.author}</div>
                <div className="my-5 rounded-sm">{interview.questions}</div>
                <div className="my-5 rounded-sm">{interview.answers}</div>
                <div className="my-5 rounded-sm">{interview.content}</div>
                <div className="my-5 rounded-sm">{interview.pics}</div>
              </div>
            </div>
          ) : (
            <p>No interview found</p>
          )}
        </div>
      </div>
    </>
  );
}
