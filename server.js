/* SEM FASTIFY import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.write("Hello World")

    return res.end()
})

server.listen(3333) */

//com FASTIFY:
import { fastify } from "fastify";

const server = fastify()

server.get('/', () => {
    return 'Hello World'
})

server.listen({
    port: 3333
})