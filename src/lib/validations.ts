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
  bandActive: requiredString,
  bandYearsActive: requiredString,
  bandCampLink: z.string().optional(),
  bandAppleLink: z.string().optional(),
  bandSpotifyLink: z.string().optional(),
  bandOtherMusicLink: z.string().optional(),
});

console.log(createBandSchema)

export type CreateBandValues = z.infer<typeof createBandSchema>;

export const createShowSchema = z.object({
  showName: requiredString,
  flyerLink: z.string(),
  showInfo: requiredString,
});

export type CreateShowValues = z.infer<typeof createShowSchema>;
