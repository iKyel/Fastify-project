// book.routes.ts

import { FastifyInstance } from "fastify";
import { registerBookHandler, getBooksHandler } from "./book.controller";

async function bookRoutes(server: FastifyInstance) {
  server.post('/', registerBookHandler);
  server.get('/', getBooksHandler); 
}

export default bookRoutes;
