import { FastifyRequest, FastifyReply } from "fastify";
import { createGenre } from "./genre.service"; 
import { getGenres } from "./genre.service"; 
import { CreateGenreInput } from "./genre.schema"; 

// Hàm tạo thể loại
async function createGenreHandler(
  request: FastifyRequest<{
    Body: CreateGenreInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const genre = await createGenre(body); // Gọi hàm createGenre để lưu thể loại

    return reply.code(201).send(genre); // Trả về thể loại đã tạo với mã trạng thái 201
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e); // Nếu có lỗi, trả về mã trạng thái 500
  }
}

// Hàm lấy danh sách thể loại
async function getGenresHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const genres = await getGenres(); // Gọi hàm lấy danh sách thể loại từ service
    return reply.code(200).send(genres); // Trả về danh sách thể loại với mã trạng thái 200
  } catch (e) {
    console.error(e);
    return reply.code(500).send({ error: 'Đã xảy ra lỗi khi lấy danh sách thể loại' }); // Nếu có lỗi, trả về mã trạng thái 500
  }
}

export { createGenreHandler, getGenresHandler }; // Xuất cả hai hàm
