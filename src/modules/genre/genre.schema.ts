import { z } from "zod";

// Định nghĩa schema cho Genre
const createGenreSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }).min(1, "Name must be at least 1 character long"), // Tên thể loại không được để trống
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }).min(10, "Description must be at least 10 characters long"), // Mô tả phải ít nhất 10 ký tự
});

// Type cho input của tạo Genre
export type CreateGenreInput = z.infer<typeof createGenreSchema>;

export default createGenreSchema; // Xuất khẩu schema
