import { Socket } from "socket.io";
import { State, User } from "../shared/types";
// import { getLoginSession } from '../lib/auth'

let state: State = State.CLOSED;
let players: Array<User> = [];
let bets: Array<Array<User>> = [[], [], [], [], [], [], []];
let teeth: Array<number> = [1, 1, 1, 1, 1, 1, 1];

const logState = () => {
  console.log("┌────── ⋆⋅✦⋅⋆ ──────┐");
  console.log("     STATE UPDATED    ");
  console.log(
    "state:",
    `
  `,
    state
  );
  console.log(
    "players:",
    `
  `,
    players
  );
  console.log(
    "bets:",
    `
  `,
    bets
  );
  console.log(
    "teeth:",
    `
  `,
    teeth
  );
  console.log("└────── ⋆⋅✦⋅⋆ ──────┘");
};

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
    state = newState;
    socket.broadcast.emit("state", newState);
    socket.emit("state", newState);
    logState();
  });

  // TODO: only during lobby game state
  socket.on("newPlayer", (user) => {
    if (!players.find((u: User) => u.id === user.id)) {
      players.push({ ...user, lost: false });
      socket.broadcast.emit("players", players);
    }
    logState();
  });

  // TODO: only during betting game state
  // TODO: only existing/not losing users
  // TODO: only valid teeth
  socket.on("newBet", (betObj) => {
    const bet = betObj.bet;
    const user = betObj.user;

    if (teeth[bet] === 0) {
      return;
    }

    bets = bets.map((betPlayers: Array<User>) =>
      betPlayers.filter((usr: User) => usr.id !== user.id)
    );
    bets[bet].push(user);

    socket.broadcast.emit("newBets", bets);
    socket.emit("betPlaced", bet);
    logState();
  });

  // TODO: streamer only
  socket.on("chomp", (badTooth) => {
    // update lost players from bets
    bets[badTooth].map((player) => {
      const playerEntry = players.find((p) => p.id === player.id) || {
        lost: true,
      };
      playerEntry.lost = true;
    });
    const losers = players.filter(user => user.lost === true)

    // update teeth
    teeth[badTooth] = 0;

    // update state
    state = State.RESULTS;

    socket.broadcast.emit("losers", losers);
    socket.emit("players", players);
  });

  // TODO: Streamer only
  socket.on("endGameRound", ({ newTeeth }) => {
    state = State.BETTING;
    teeth = newTeeth;
    bets = [[], [], [], [], [], [], []];

    const newGameState = { state, teeth, bets };

    socket.broadcast.emit("newGameRound", newGameState);
    socket.emit("newGameRound", newGameState);
    logState();
  });
};
