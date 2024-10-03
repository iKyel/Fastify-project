import prisma from "../../utils/prisma";
import { CreateBookInput } from "./book.schema";

export async function createBook(input: CreateBookInput) {
  try {
    const book = await prisma.book.create({
      data: {
        title: input.title,
        publishedDate: input.publishedDate,
        price: input.price,
        summary: input.summary,
        authors: {
          create: input.authors.map((authorId) => ({
            author: { connect: { id: authorId } },
          })),
        },
        genres: {
          create: input.genres.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
      },
    });
    return book;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Could not create book.");
  }
}

export async function getBooks() {
    try {
      const books = await prisma.book.findMany({
        include: {
          authors: {
            include: {
              author: { // Bao gồm dữ liệu tác giả
                select: {
                  name: true, // Chỉ lấy trường 'name'
                },
              },
            },
          },
          genres: {
            include: {
              genre: { // Bao gồm dữ liệu thể loại
                select: {
                  name: true, // Chỉ lấy trường 'name'
                },
              },
            },
          },
        },
      });
  
      // Biến đổi dữ liệu sách để chỉ bao gồm tiêu đề, tên tác giả và tên thể loại
      const result = books.map((book) => ({
        title: book.title,
        authors: book.authors.map((bookAuthor) => bookAuthor.author.name), // Truy cập tên của tác giả
        genres: book.genres.map((bookGenre) => bookGenre.genre.name), // Truy cập tên của thể loại
        publishedDate: book.publishedDate,
        price: book.price,
        summary: book.summary,
      }));
  
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy sách:", error);
      throw new Error("Không thể lấy danh sách sách.");
    }
  }
  