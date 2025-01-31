"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getShowDataSelect, ShowData } from "@/lib/types";
import { createShowSchema } from "@/lib/validations";
import { notFound } from "next/navigation";

export async function NewShow(input: {
  showName: string;
  flyerLink: string;
  showInfo: string;
  bandId?: string;
  showTime: string;
  showLocation: string;
}) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  try {
    const parsedData = createShowSchema.parse(input);
    const { showName, flyerLink, showInfo, bandId, showTime, showLocation } = parsedData;

    const showData = {
      showName,
      flyerLink,
      showInfo,
      bandId,
      showTime,
      showLocation,
      createdAt: new Date(),
    };

    const newShow = await prisma.show.create({
      data: showData,
    });
    console.log("Show data for new show: ", newShow);
    return newShow;
  } catch (error) {
    console.error("Create show action error: ", error);
  }
}

export async function FindAllShows(): Promise<ShowData[]> {
  try {
    const shows = await prisma.show.findMany({
      select: getShowDataSelect(),
    });
    console.log("Found in actions SHOW: ", shows);
    return shows;
  } catch (error) {
    console.error("Failed in actions to find all shows:", error);
    return [];
  }
}

export async function DeleteShow(showId: string) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  try {
    const showToDelete = await prisma.show.findUnique({
      where: { id: showId },
    });
    if (!showToDelete) throw new Error("Show not found");
    await prisma.show.delete({
      where: { id: showId },
    });
  } catch (error) {
    console.error("Error to delete action");
  }
}

export async function getShow(id: string) {
  const show = await prisma.show.findFirst({
    where: { id: id },
    select: getShowDataSelect(),
  });
  console.log("show from actions: ", show);
  if (!show) notFound();
  return show;
}
