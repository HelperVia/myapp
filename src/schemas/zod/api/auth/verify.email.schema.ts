import { z } from "zod";
export const VerifyEmailCodeSchema = z.object({
  code: z
    .string("Email code is required")
    .regex(/^\d{4}$/, "Must be exactly 4 digits"),
});

export type VerifyEmailCodeSchemaType = z.infer<typeof VerifyEmailCodeSchema>;
