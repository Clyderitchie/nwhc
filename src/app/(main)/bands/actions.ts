"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
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
}