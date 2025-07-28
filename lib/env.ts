import { z } from "zod"

const envSchema = z.object({
    GOOGLE_DRIVE_URL: z.string().url(),
    UNSPLASH_ACCESS_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

