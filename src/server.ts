import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import userRoutes from "./modules/user/user.route";
import genreRoutes from "./modules/genre/genre.route";
import authorRoutes from "./modules/author/author.route";
import bookRoutes from "./modules/book/book.route";
// defines
// Define the type for the parameters

const fastify = Fastify({
  logger: true,
});

// fastify.register(DbConnector)
// fastify.register(FirstRoute)
fastify.register(userRoutes, {prefix: '/api/users'});
fastify.register(genreRoutes, {prefix: '/api/genres'});
fastify.register(authorRoutes, {prefix: '/api/authors'});
fastify.register(bookRoutes, {prefix: '/api/books'})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server đang chạy ở http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
