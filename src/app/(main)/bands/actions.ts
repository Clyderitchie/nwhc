"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BandData, getBandDataSelect } from "@/lib/types";
import { createBandSchema } from "@/lib/validations";
import { notFound } from "next/navigation";

export async function NewBand(input: {
  bandName: string;
  bandPic: string;
  bandBio: string;
  bandCampLink: string;
  bandAppleLink: string;
  bandSpotifyLink: string;
  bandOtherMusicLink: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const parsedData = createBandSchema.parse(input);
    const {
      bandName,
      bandPic,
      bandBio,
      bandOrigin,
      bandActive,
      bandYearsActive,
      bandCampLink,
      bandAppleLink,
      bandSpotifyLink,
      bandOtherMusicLink,
    } = parsedData;

    const bandData = {
      bandName,
      bandPic,
      bandBio,
      bandOrigin,
      bandActive,
      bandYearsActive,
      bandCampLink,
      bandAppleLink,
      bandSpotifyLink,
      bandOtherMusicLink,
      createdAt: new Date(),
    };

    const newBand = await prisma.band.create({
      data: bandData,
    });

    console.log("Created new band");
    return newBand;
  } catch (error) {
    console.error("Error creating new band", error);
  }
}

export async function FindAllBands(): Promise<BandData[]> {
  try {
    const bands = await prisma.band.findMany({
      select: getBandDataSelect(),
    });
    console.log("Found all bands", bands);
    return bands;
  } catch (error) {
    console.error("Error find all bands", error);
    return [];
  }
}

export async function DeleteBand(bandId: string) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  try {
    const bandToDelete = await prisma.band.findUnique({
      where: { id: bandId },
    });
    if (!bandToDelete) throw new Error("Band not found");
    await prisma.band.delete({
      where: { id: bandId },
    });
  } catch (error) {
    console.error("Failed to delete");
  }
}

export async function FindBandById(id: string) {
  try {
    const band = await prisma.band.findUnique({
      where: { id },
      select: {
        id: true,
        bandName: true,
        bandPic: true,
        bandBio: true,
        bandOrigin: true,
        bandActive: true,
        bandYearsActive: true,
        bandCampLink: true,
        bandAppleLink: true,
        bandSpotifyLink: true,
        bandOtherMusicLink: true,
      },
    });
    return band;
  } catch (error) {
    console.error("Error searching");
  }
}

export async function getBand(id: string) {
  const band = await prisma.band.findFirst({
    where: { id: id },
    select: getBandDataSelect(),
  });
  if (!band) notFound();
  return band;
}
