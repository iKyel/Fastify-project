import { FastifyRequest, FastifyReply } from "fastify";
import {
  createBook,
  getBooks,
  getBookDetails,
  searchBooks,
} from "./book.service";
import { CreateBookInput } from "./book.schema";

export async function registerBookHandler(
  request: FastifyRequest<{
    Body: CreateBookInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const book = await createBook(body);

    return reply.code(201).send(book);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getBooksHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const books = await getBooks();
    return reply.code(200).send(books);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getBookDetailsHandler(
  request: FastifyRequest<{
    Params: { bookId: string };
  }>,
  reply: FastifyReply
) {
  const { bookId } = request.params;

  try {
    const book = await getBookDetails(bookId);
    if (!book) {
      return reply.code(404).send({ message: "Book not found" });
    }
    return reply.code(200).send(book);
  } catch (e) {
    console.error("Error fetching book details:", e);
    return reply
      .code(500)
      .send({ message: "Error fetching book details", error: e });
  }
}

export async function searchBooksHandler(
  request: FastifyRequest<{
    Querystring: { title: string }; // Nhận tiêu đề từ query string
  }>,
  reply: FastifyReply
) {
  const { title } = request.query;

  try {
    const books = await searchBooks(title);
    return reply.code(200).send(books);
  } catch (e) {
    console.error("Error searching books:", e);
    return reply.code(500).send({ message: "Error searching books", error: e });
  }
}
