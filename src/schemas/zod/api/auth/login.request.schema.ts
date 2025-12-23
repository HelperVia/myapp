import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string("Password is required.")
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginRequestType = z.infer<typeof LoginRequestSchema>;
