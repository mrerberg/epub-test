const Fastify = require("fastify");
const fs = require("node:fs");
const path = require("node:path");

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

fastify.register(import("@fastify/multipart"));

// Declare a route
fastify.post("/upload", async function handler(request, reply) {
  const fileData = await request.file();

  const writeStream = fs.createWriteStream(
    path.join(__dirname, "./books/book.epub")
  );

  fileData.file.pipe(writeStream);

  return { status: "ok" };
});

async function start() {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
