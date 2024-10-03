import prisma from "../../utils/prisma";
import { CreateAuthorInput } from "./author.schema";

// Hàm tạo tác giả
export async function createAuthor(input: CreateAuthorInput) {
  const author = await prisma.author.create({
    data: input,
  });

  return author;
}

// Hàm lấy danh sách tác giả
export async function getAuthors() {
  const authors = await prisma.author.findMany(); 
  return authors;
}
