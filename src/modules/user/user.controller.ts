import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export default registerUserHandler;
