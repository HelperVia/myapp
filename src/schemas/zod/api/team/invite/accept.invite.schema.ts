import { z } from "zod";

export const AcceptInviteSchema = z.object({
  code: z.string("Invalid Code"),
});

export type AcceptInviteSchemaType = z.infer<typeof AcceptInviteSchema>;
