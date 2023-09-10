/* SEM FASTIFY import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.write("Hello World")

    return res.end()
})

server.listen(3333) */

//com FASTIFY:
import { fastify } from "fastify";
//import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();

//const database = new DataBaseMemory();
const database = new DataBasePostgres();

server.get("/videos", async (req) => {
  const search = req.query.search;
  const videos = await database.list(search);

  return videos;
});

server.post("/videos", async (req, reply) => {
  const { title, description, duration } = req.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.put("/videos/:id", async (req, reply) => {
  const videoId = req.params.id;

  const { title, description, duration } = req.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (req, reply) => {
  const videoId = req.params.id;

  await database.delete(videoId);

  reply.status(204).send();
});

server.listen({
  port: 3333,
});
