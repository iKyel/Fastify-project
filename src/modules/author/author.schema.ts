import { z } from "zod";

const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"), // Use min(1) instead of nonempty()
  bio: z.string().optional(),
});

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
