import { z } from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: "Email must be a string",
  }).email(),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: "password must be a string",
  }).min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>