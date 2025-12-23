import { z } from "zod";

export const RegisterRequestSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  fullname: z
    .string("Fullname is required.")
    .min(5, { message: "Full name must be at least 3 characters" })
    .max(25, { message: "Full name must be at most 25 characters" }),
  password: z
    .string("Password is required.")
    .min(6, { message: "Password must be at least 6 characters" }),
  invite_code: z.string("Invite Code is incorrect").optional(),
});

export type RegisterType = z.infer<typeof RegisterRequestSchema>;
