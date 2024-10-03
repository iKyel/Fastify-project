import { FastifyInstance } from "fastify";
import { createGenreHandler, getGenresHandler } from "./genre.controller"; // Nhập controller với cả hai hàm

async function genreRoutes(server: FastifyInstance) {
    // Route để tạo thể loại mới
    server.post('/', createGenreHandler);
    
    // Route để lấy danh sách tất cả thể loại
    server.get('/', getGenresHandler); // Thêm route GET để lấy danh sách thể loại
}

export default genreRoutes;
