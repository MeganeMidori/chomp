import { Socket } from "socket.io";
import { State } from "../shared/types";

let state: State = State.CLOSED;
let players: Array<string> = [];
let bets: Array<Array<string>> = [[], [], [], [], [], [], []];
let teeth: Array<number> = [1, 1, 1, 1, 1, 1, 1];

export const handler = (socket: Socket) => {
  console.log("connection");
  socket.emit("state", state);
  socket.emit("players", players);
  socket.emit("newBets", bets);
  socket.emit("newTeeth", teeth);

  // TODO: streamer only
  socket.on("state", (newState) => {
    console.log("state", newState);
    state = newState;
    socket.broadcast.emit("state", newState);
    socket.emit("state", newState);
  });

  // TODO: only during lobby game state
  socket.on("newPlayer", (user) => {
    console.log("user", user);
    const newPlayers = players;
    newPlayers.push(user);
    players = newPlayers;
    socket.broadcast.emit("players", players);
  });

  // TODO: only during betting game state
  // TODO: only existing users
  socket.on("newBet", (betObj) => {
    console.log("bet", betObj);

    const bet = betObj.bet;
    const user = betObj.user;

    if (teeth[bet] === 0) {
      return;
    }

    bets = bets.map((betPlayers: Array<string>) =>
      betPlayers.filter((usr: string) => usr !== user)
    );
    bets[bet].push(user);

    console.log("new bets:", bets);

    socket.broadcast.emit("newBets", bets);
    socket.emit("betPlaced", bet);
  });

  // TODO: streamer only
  socket.on("losers", (losers) => {
    socket.broadcast.emit("losers", losers);
    socket.emit(
      "newWinners",
      players.filter((player: string) => losers.indexOf(player) < 0)
    );
  });

  // TODO: Streamer only
  socket.on("newTeeth", (newTeeth) => {
    teeth = newTeeth;
    socket.broadcast.emit("newTeeth", teeth);
    socket.emit("newTeeth", teeth);
  });
};
