import { Socket } from "socket.io";
import { State } from "../shared/types";

let state: State = State.CLOSED;

export const handler = (socket:Socket) => {
  console.log("connection");
  socket.emit("ping", Date.now());
  socket.emit("state", state)

  socket.on("pong", (message) => {
    console.log("pong", message);
  });
};
