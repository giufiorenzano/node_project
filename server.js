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

server.get("/", () => {
  return "Hello World";
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

server.put("/videos/:id", () => {
  return "Hello World";
});

server.delete("/videos/:id", () => {
  return "Hello World";
});

server.listen({
  port: 3333,
});
