import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const dataRowSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Name is required" }),
  age: z.number().min(0, { message: "Age must be a positive number" }),
  isEditing: z.boolean(),
});

export type DataRow = z.infer<typeof dataRowSchema>;
