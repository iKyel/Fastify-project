import { FastifyRequest, FastifyReply } from "fastify";
import { createBook, getBooks } from "./book.service";
import { CreateBookInput } from "./book.schema";
import { get } from "http";

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


