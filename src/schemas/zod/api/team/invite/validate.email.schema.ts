import { z } from "zod";

export const teamInviteValidateEmailSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export type teamInviteValidateEmailSchemaType = z.infer<
  typeof teamInviteValidateEmailSchema
>;
