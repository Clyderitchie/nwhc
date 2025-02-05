"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getInterviewDataSelect, InterviewData } from "@/lib/types";
import { createInterviewSchema } from "@/lib/validations";

export async function NewInterview(input: {
  title: string;
  content: string;
  author: string;
  questions: string;
  answers: string;
  pics?: string;
  link: {
    appleMusic?: string;
    spotifyMusic?: string;
    bandCamp?: string;
    twitter?: string;
    instagram?: string;
    shop?: string;
  }[];
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const parsedData = createInterviewSchema.parse(input);
    const { title, content, link, author, questions, answers, pics } = parsedData;

    const interviewData = {
      title,
      content,
      author,
      questions,
      answers,
      pics,
      link: { create: link },
      createdAt: new Date(),
    };

    const newInterview = await prisma.interview.create({
      data: interviewData,
    });

    console.log("Create new interview: ", newInterview);
    return newInterview;
  } catch (error) {
    console.error("Error creating interview action: ", error);
  }
}

export async function FindAllInterviews(): Promise<InterviewData[]> {
  try {
    const interviews = await prisma.interview.findMany({
      select: getInterviewDataSelect(),
    });
    return interviews;
  } catch (error) {
    console.error("Error finding all interviews: ", error);
    return [];
  }
}
