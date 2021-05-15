import { Socket } from "socket.io";
import { State } from "../shared/types";

let state: State = State.CLOSED;
let players: any = [];
let bets: any = [[], [], [], [], [], [], []];

export const handler = (socket: Socket) => {
  console.log("connection");
  socket.emit("state", state);

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

  socket.on("newBet", (betObj) => {
    console.log("bet", betObj);

    const bet = betObj.bet;
    const user = betObj.user;

    bets = bets.map((betPlayers:any) => betPlayers.filter((usr:any) => usr !== user))
    bets[bet].push(user);

    console.log("new bets:", bets);

    socket.broadcast.emit("newBets", bets);
    socket.emit("betPlaced", bet);
  });
};
