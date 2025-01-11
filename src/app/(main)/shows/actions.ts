"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getShowDataSelect, ShowData } from "@/lib/types";
import { createShowSchema } from "@/lib/validations";
import { notFound } from "next/navigation";

export async function NewShow(input: {
  showName: string;
  flyerLink?: string;
  showInfo: string;
}) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  try {
    const parsedData = createShowSchema.parse(input);
    const { showName, flyerLink, showInfo } = parsedData;

    const showData = {
        showName, flyerLink: flyerLink || "", showInfo
    };

    const newShow = await prisma.show.create({
        data: showData
    })
    console.log("Created a new show");
    return newShow
  } catch (error) {
    console.error("error creating show");
  }
}

export async function FindAllShows(): Promise<ShowData[]> {
    try {
        const shows = await prisma.show.findMany({
            select: getShowDataSelect(),
        });
        console.log("Found Shows")
        return shows;
    } catch (error) {
        console.error("Action error finding shows")
        return [];
    }
}

export async function getShow(id: string) {
    const show = await prisma.show.findFirst({
        where: { id: id },
        // select: getComputedStyle(),
    })
    if (!show) notFound();
    return show;
}