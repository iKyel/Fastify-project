import { FastifyInstance } from "fastify";
import { registerAuthorHandler, getAuthorsHandler } from "./author.controller";

async function authorRoutes(server: FastifyInstance) {
  server.post('/', registerAuthorHandler); // Route đăng ký tác giả
  server.get('/', getAuthorsHandler); // Route lấy danh sách tác giả
}

export default authorRoutes;
