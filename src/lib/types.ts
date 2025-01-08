import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  username: true,
} satisfies Prisma.UserSelect;

export function getUserDataSelect(loggedInUserId: true) {
  return {
    id: true,
    username: true,
    createdAt: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getBandDataSelect() {
  return {
    id: true,
    bandName: true,
    bandPic: true,
    bandBio: true,
    bandCampLink: true,
    bandAppleLink: true,
    bandSpotifyLink: true,
  } satisfies Prisma.BandSelect;
}

export type BandData = Prisma.BandGetPayload<{
  select: ReturnType<typeof getBandDataSelect>;
}>;
