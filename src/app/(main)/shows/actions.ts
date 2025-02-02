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
  link?: {
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
    const parsedData = createShowSchema.parse(input);
    const {
      showName,
      flyerLink,
      showInfo,
      bandId,
      showTime,
      showLocation,
      link,
    } = parsedData;

    const showData = {
      showName,
      flyerLink,
      showInfo,
      bandId,
      showTime,
      showLocation,
      createdAt: new Date(),
    };

    if (link && link.length > 0) {
      showData.link = {
        create: link,
      };
    }

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
    select: {
      id: true,
      showName: true,
      flyerLink: true,
      showInfo: true,
      bandId: true,
      showTime: true,
      showLocation: true,
      link: {
        select: {
          id: true,
          appleMusic: true,
          spotifyMusic: true,
          bandCamp: true,
          twitter: true,
          instagram: true,
          shop: true,
        },
      },
      band: {
        select: {
          id: true,
          bandName: true,
        },
      },
    },
  });
  console.log("show from actions: ", show);
  if (!show) notFound();
  return show;
}
