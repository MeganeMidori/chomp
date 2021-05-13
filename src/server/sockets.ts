import { Socket } from "socket.io";
import { State } from "../shared/types";

let state: State = State.CLOSED;
let players:any = [];

export const handler = (socket: Socket) => {
  console.log("connection");
  socket.emit("ping", Date.now());
  socket.emit("state", state);

  socket.on("pong", (message) => {
    console.log("pong", message);
  });

  socket.on("state", (newState) => {
    console.log("state", newState);
    state = newState;
    socket.broadcast.emit("state", newState);
    socket.emit("state", newState);
  });

  socket.on("newPlayer", (user) => {
    console.log("user", user);
    const newPlayers = players;
    newPlayers.push(user);
    players = newPlayers;
    socket.broadcast.emit("players", players);
  });
};
