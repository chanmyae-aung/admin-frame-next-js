import { z } from 'zod';

const passwordSchema = z.string({
  message: 'Password is required!',
});
// .min(8, "Passwords must be at least 8 characters long")
// .max(16, "Passwords cannot be longer than 16 characters")
// .refine((e) => /[a-z]/.test(e), "Password must include lower cases")
// .refine((e) => /[A-Z]/.test(e), "Password must include Capital letters")
// .refine((e) => /[\d]/.test(e), "Password must include numbers")
// .refine(
//   (e) => /[^a-zA-Z0-9]/,
//   "Password must include non alphamumeric characters"
// );

export const loginSchema = z.object({
  email: z.string(),
  password: passwordSchema,
});

export const signupSchema = z.object({
  firstName: z.string({
    message: 'First Name is required!',
  }),
  lastName: z.string({
    message: 'Last Name is required!',
  }),
  email: z
    .string({
      message: 'Email is required!',
    })
    .email({
      message: 'Invalid email!',
    }),
  password: passwordSchema,
});

export const passwordRestSchema = z.object({
  email: z.string(),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignUpForm = z.infer<typeof signupSchema>;
export type PasswordRestForm = z.infer<typeof passwordRestSchema>;
