import { FastifyInstance } from "fastify";
import { 
  registerBookHandler, 
  getBooksHandler, 
  getBookDetailsHandler ,
  searchBooksHandler
} from "./book.controller";

async function bookRoutes(server: FastifyInstance) {
  // Route to register a new book
  server.post('/', registerBookHandler);

  // Route to get all books
  server.get('/', getBooksHandler);

  // Route to get book details by ID
  server.get('/:bookId', getBookDetailsHandler);

  // Route to search books by title
  server.get('/search', searchBooksHandler);
}

export default bookRoutes;
