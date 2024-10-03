// author.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { createAuthor } from "./author.service";
import { getAuthors } from "./author.service"; // Giả sử bạn đã định nghĩa hàm này trong author.service
import { CreateAuthorInput } from "./author.schema";

async function registerAuthorHandler(
  request: FastifyRequest<{
    Body: CreateAuthorInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const author = await createAuthor(body);
    return reply.code(201).send(author);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

// Hàm lấy danh sách tác giả
async function getAuthorsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authors = await getAuthors(); // Lấy danh sách tác giả từ service
    return reply.code(200).send(authors);
  } catch (e) {
    console.error(e);
    return reply.code(500).send({ error: 'Đã xảy ra lỗi khi lấy danh sách tác giả' });
  }
}

// Xuất khẩu
export { registerAuthorHandler, getAuthorsHandler };
