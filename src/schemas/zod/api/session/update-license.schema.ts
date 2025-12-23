import { z } from "zod";

export const updateLicenseSchema = z.object({
  licenseNumber: z.string("License Number is required."),
});

export type updateLicenseSchema = z.infer<typeof updateLicenseSchema>;
