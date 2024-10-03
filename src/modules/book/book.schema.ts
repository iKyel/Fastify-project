import { z } from "zod";

const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title must be at least 1 character
  authors: z.array(z.string().min(1)), // Array of author IDs must not be empty
  genres: z.array(z.string().min(1)), // Array of genre IDs must not be empty
  publishedDate: z.date(), // Optional date
  price: z.number().positive("Price must be a positive number"), // Positive price
  summary: z.string(), // Optional summary
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
