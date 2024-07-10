import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
