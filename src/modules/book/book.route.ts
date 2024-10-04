import { FastifyInstance } from "fastify";
import { 
  registerBookHandler, 
  getBooksHandler, 
  getBookDetailsHandler 
} from "./book.controller";

async function bookRoutes(server: FastifyInstance) {
  // Route to register a new book
  server.post('/', registerBookHandler);

  // Route to get all books
  server.get('/', getBooksHandler);

  // Route to get book details by ID
  server.get('/:bookId', getBookDetailsHandler);
}

export default bookRoutes;
