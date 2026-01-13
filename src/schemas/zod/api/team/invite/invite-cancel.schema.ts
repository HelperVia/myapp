import { IdValueSchema } from "@/schemas/zod/id.schema";
import { z } from "zod";

export const InviteCancelSchema = z.object({
  id: IdValueSchema(),
});

export type InviteCancelSchemaType = z.infer<typeof InviteCancelSchema>;
