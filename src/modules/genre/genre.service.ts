import prisma from "../../utils/prisma"; // Nhập prisma client
import { CreateGenreInput } from "./genre.schema"; // Nhập schema cho Genre

// Hàm tạo thể loại mới
export async function createGenre(input: CreateGenreInput) {
  const genre = await prisma.genre.create({
    data: input, // Sử dụng dữ liệu từ input để tạo genre
  });

  return genre; // Trả về genre đã được tạo
}

// Hàm lấy danh sách tất cả thể loại
export async function getGenres() {
  const genres = await prisma.genre.findMany(); // Lấy tất cả thể loại từ cơ sở dữ liệu
  return genres; // Trả về danh sách thể loại
}
