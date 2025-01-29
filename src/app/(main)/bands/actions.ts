"use server";
// TODO: Find All Bands needs to be refactored
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BandData, getBandDataSelect } from "@/lib/types";
import { createBandSchema, updateBandSchema } from "@/lib/validations";
import { notFound } from "next/navigation";

export async function NewBand(input: {
  bandName: string;
  bandPic: string;
  bandBio: string;
  bandOrigin: string;
  bandActive: string;
  bandYearsActive: string;
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
        shows: {
            select: {
              id: true,
              showName: true,
              flyerLink: true,
              showInfo: true,
            },
          },
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

export async function UpdateBand(input: {
  bandId: string;
  bandName: string;
  bandPic: string;
  bandBio: string;
  bandOrigin: string;
  bandActive: string;
  bandYearsActive: string;
  bandCampLink: string;
  bandAppleLink: string;
  bandSpotifyLink: string;
  bandOtherMusicLink: string;
}) {
    const { user } = await validateRequest();

    if (!user) throw Error("Unauthorized");

  try {
    const validateBand = updateBandSchema.parse(input);

    const updateBand = await prisma.band.update({
      where: { id: validateBand.bandId },
      data: {
        bandName: validateBand.bandName,
        bandPic: validateBand.bandPic,
        bandBio: validateBand.bandBio,
        bandOrigin: validateBand.bandOrigin,
        bandActive: validateBand.bandActive,
        bandYearsActive: validateBand.bandYearsActive,
        bandCampLink: validateBand.bandCampLink,
        bandAppleLink: validateBand.bandAppleLink,
        bandSpotifyLink: validateBand.bandSpotifyLink,
        bandOtherMusicLink: validateBand.bandOtherMusicLink,
      },
    });
  } catch (error) {
    console.error("Error updating band", error);
  }
}
