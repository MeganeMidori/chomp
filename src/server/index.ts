import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import { handler } from "./sockets";

const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const main = async () => {
  await app.prepare();

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on("connection", handler);

  server.listen(port);
  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
};

main();
