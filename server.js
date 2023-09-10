/* SEM FASTIFY import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.write("Hello World")

    return res.end()
})

server.listen(3333) */

//com FASTIFY:
import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DataBaseMemory();

server.get("/videos", (req) => {
  const search = req.query.search
  const videos = database.list(search);

  return videos;
});

server.post("/videos", (req, reply) => {
  const { title, description, duration } = req.body;

  database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.put("/videos/:id", (req, reply) => {
  const videoId = req.params.id;

  const { title, description, duration } = req.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (req, reply) => {
  const videoId = req.params.id;

  database.delete(videoId)

  reply.status(204).send()
});

server.listen({
  port: 3333,
});
