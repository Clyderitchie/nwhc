import { string, z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createBandSchema = z.object({
  bandName: requiredString,
  bandPic: z.string().optional(),
  bandBio: requiredString,
  bandOrigin: requiredString,
  bandActive: z.boolean(),
  bandYearsActive: requiredString,
  bandCampLink: z.string().optional(),
  bandAppleLink: z.string().optional(),
  bandSpotifyLink: z.string().optional(),
  bandOtherMusicLink: z.string().optional(),
  show: z
    .array(
      z.object({
        id: z.string().optional(),
        showName: z.string(),
        flyerLink: z.string(),
        showInfo: z.string(),
        bandId: z.string().optional(),
      }),
    )
    .optional(),
  link: z
    .array(
      z.object({
        id: z.string().optional(),
        appleMusic: z.string(),
        spotifyMusic: z.string(),
        bandCamp: z.string(),
        twitter: z.string(),
        instagram: z.string(),
        shop: z.string(),
      }),
    )
    .optional(),
});

export type CreateBandValues = z.infer<typeof createBandSchema>;

export const updateBandSchema = z.object({
  bandId: z.string(),
  bandName: z.string().optional(),
  bandPic: z.string().optional(),
  bandBio: z.string().optional(),
  bandOrigin: z.string().optional(),
  bandActive: z.string().optional(),
  bandYearsActive: z.string().optional(),
  bandCampLink: z.string().optional(),
  bandAppleLink: z.string().optional(),
  bandSpotifyLink: z.string().optional(),
  bandOtherMusicLink: z.string().optional(),
  shows: z
    .array(
      z.object({
        id: z.string().optional(),
        showName: z.string(),
        flyerLink: z.string(),
        showInfo: z.string(),
        bandId: z.string().optional(),
      }),
    )
    .optional(),
});

export type UpdateBandValue = z.infer<typeof updateBandSchema>;

export const createShowSchema = z.object({
  showName: requiredString,
  flyerLink: z.string(),
  showInfo: requiredString,
  bandId: z.string().optional(),
  showLocation: z.string(),
  showTime: z.string(),
  link: z
  .array(
    z.object({
      id: z.string().optional(),
      appleMusic: z.string(),
      spotifyMusic: z.string(),
      bandCamp: z.string(),
      twitter: z.string(),
      instagram: z.string(),
      shop: z.string(),
    }),
  )
  .optional(),
});

export type CreateShowValues = z.infer<typeof createShowSchema>;
