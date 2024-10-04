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
    const books = await prisma.book.findMany({});

    // Biến đổi dữ liệu sách để chỉ bao gồm tiêu đề, tên tác giả và tên thể loại
    const result = books.map((book) => ({
      id: book.id,
      title: book.title,
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

export async function getBookDetails(bookId: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        authors: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    // Map authors and genres to return a cleaner response
    const detailedBook = {
      title: book.title,
      publishedDate: book.publishedDate,
      price: book.price,
      summary: book.summary,
      authors: book.authors.map((a) => ({
        name: a.author.name,
      })),
      genres: book.genres.map((g) => ({
        name: g.genre.name,
      })),
    };

    return detailedBook;
  } catch (error) {
    console.error("Error getting book details:", error);
    throw new Error("Could not fetch book details.");
  }
}
