"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const sockets_1 = require("./sockets");
const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const main = async () => {
    await app.prepare();
    const server = http_1.createServer((req, res) => {
        const parsedUrl = url_1.parse(req.url, true);
        handle(req, res, parsedUrl);
    });
    const io = new socket_io_1.Server(server);
    io.on("connection", sockets_1.handler);
    server.listen(port);
    // tslint:disable-next-line:no-console
    console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
};
main();
//# sourceMappingURL=index.js.map