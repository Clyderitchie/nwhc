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
    bandBio: true,
    bandPic: true,
    bandOrigin: true,
    bandYearsActive: true,
    show: {
      select: {
        id: true,
        bandId: true,
        showName: true,
        showInfo: true,
        flyerLink: true,
      },
    },
    link: {
      select: {
        id: true,
        bandId: true,
        showId: true,
        interviewId: true,
        appleMusic: true,
        bandCamp: true,
        twitter: true,
        instagram: true,
        shop: true,
      },
    },
  } satisfies Prisma.BandSelect;
}

export type BandData = Prisma.BandGetPayload<{
  select: ReturnType<typeof getBandDataSelect>;
}>;

export const bandDataSelect = {
  id: true,
  bandName: true,
  bandBio: true,
  bandOrigin: true,
  bandYearsActive: true,
  show: {
    select: {
      id: true,
      bandId: true,
      showName: true,
      showInfo: true,
      flyerLink: true,
    },
  },
  link: {
    select: {
      id: true,
      bandId: true,
      showId: true,
      interviewId: true,
      appleMusic: true,
      bandCamp: true,
      twitter: true,
      instagram: true,
      shop: true,
    },
  },
} satisfies Prisma.BandSelect;

export function getShowDataSelect() {
  return {
    id: true,
    showName: true,
    bandId: true,
    flyerLink: true,
    showInfo: true,
    showLocation: true,
    showTime: true,
    band: {
      select: {
        id: true,
        bandName: true,
        bandPic: true,
        bandBio: true,
        bandOrigin: true,
        bandActive: true,
        bandYearsActive: true,
        link: {
          select: {
            id: true,
            bandId: true,
            showId: true,
            interviewId: true,
            appleMusic: true,
            bandCamp: true,
            twitter: true,
            instagram: true,
            shop: true,
          },
        },
      },
    },
    link: {
      select: {
        id: true,
        bandId: true,
        showId: true,
        interviewId: true,
        appleMusic: true,
        bandCamp: true,
        twitter: true,
        instagram: true,
        shop: true,
      },
    },
  } satisfies Prisma.ShowSelect;
}

export type ShowData = Prisma.ShowGetPayload<{
  select: ReturnType<typeof getShowDataSelect>;
}>;

export function getInterviewDataSelect() {
  return {
    id: true,
    title: true,
    author: true,
    questions: true,
    answers: true,
    pics: true,
    content: true,
    link: {
      select: {
        id: true,
        bandId: true,
        showId: true,
        interviewId: true,
        appleMusic: true,
        bandCamp: true,
        twitter: true,
        instagram: true,
        shop: true,
      },
    },
  } satisfies Prisma.InterviewSelect;
}

export type InterviewData = Prisma.InterviewGetPayload<{
  select: ReturnType<typeof getInterviewDataSelect>;
}>;
