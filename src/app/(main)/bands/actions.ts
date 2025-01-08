"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BandData, getBandDataSelect } from "@/lib/types";
import { createBandSchema } from "@/lib/validations";

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
        const { bandName, bandPic, bandBio, bandCampLink, bandAppleLink, bandSpotifyLink } = parsedData;

        const bandData = {
            bandName,
            bandPic,
            bandBio,
            bandCampLink,
            bandAppleLink,
            bandSpotifyLink,
            createdAt: new Date(),
        }

        const newBand = await prisma.band.create({
            data: bandData,
        });

        console.log("Created new band");
        return newBand;
    } catch (error) {
        console.error("Error creating new band");
    }
};

export async function FindAllBands(): Promise<BandData[]> {

    try {
        const bands = await prisma.band.findMany({
            select: getBandDataSelect(),
        });
        console.log("Found all bands", bands);
        return bands;
    } catch (error) {
        console.error("Error find all bands");
        return [];
    }
};