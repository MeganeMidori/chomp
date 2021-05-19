import { Socket } from "socket.io";
import { State, User } from "../shared/types";
// import { getLoginSession } from '../lib/auth'

let state: State = State.CLOSED;
let players: Array<User> = [];
let bets: Array<Array<string>> = [[], [], [], [], [], [], []];
let teeth: Array<number> = [1, 1, 1, 1, 1, 1, 1];

export const handler = async (socket: Socket) => {
  // const session = await getLoginSession(socket.handshake)
  // console.log(session.id, session.display_name)

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
    console.log('OLD PLAYERS', players);
    if (!players.find((u: User) => (u.id === user.id))) {
      players.push(user);
      socket.broadcast.emit("players", players);
    }
    console.log('NEW PLAYERS', players);
  });

  // TODO: only during betting game state
  // TODO: only existing/not losing users
  // TODO: only valid teeth
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
      players.filter((player: User) => losers.indexOf(player) < 0)
    );
  });

  // TODO: Streamer only
  socket.on("endGameRound", ({ newTeeth }) => {
    state = State.BETTING;
    teeth = newTeeth;
    bets = [[], [], [], [], [], [], []];

    const newGameState = { state, teeth, bets };

    socket.broadcast.emit("newGameRound", newGameState);
    socket.emit("newGameRound", newGameState);
  });
};
