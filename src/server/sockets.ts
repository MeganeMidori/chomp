import { Socket } from "socket.io";
import { State, User } from "../shared/types";
import { getLoginSession } from "../lib/auth";

/*** STATE ***/
let state: State = State.CLOSED;
let players: Array<User> = [];
let bets: Array<Array<User>> = [[], [], [], [], [], [], []];
let teeth: Array<number> = [1, 1, 1, 1, 1, 1, 1];

/*** HELPERS ***/
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

/*** STREAMER HANDLERS ***/
const streamerHandlers = (socket: Socket) => {
  socket.on("state", (newState) => {
    state = newState;
    socket.broadcast.emit("state", newState);
    socket.emit("state", newState);
    logState();
  });

  socket.on("losers", (losers) => {
    losers.map((player: User) => {
      const playerEntry = players.find((p) => p.id === player.id) || {
        lost: true,
      };
      playerEntry.lost = true;
    });

    socket.broadcast.emit("losers", losers);
    socket.emit("players", players);
  });

  socket.on("chomp", (badTooth) => {
    // update lost players from bets
    bets[badTooth].map((player) => {
      const playerEntry = players.find((p) => p.id === player.id) || {
        lost: true,
      };
      playerEntry.lost = true;
    });
    const losers = players.filter((user) => user.lost === true);

    // update teeth
    teeth[badTooth] = 0;

    // update state
    state = State.RESULTS;

    socket.broadcast.emit("losers", losers);
    socket.emit("players", players);
  });

  socket.on("endGameRound", ({ newTeeth }) => {
    state = State.BETTING;
    teeth = newTeeth;
    bets = [[], [], [], [], [], [], []];

    const newGameState = { state, teeth, bets };

    socket.broadcast.emit("newGameRound", newGameState);
    socket.emit("newGameRound", newGameState);
    logState();
  });

  socket.on("gameOver", () => {
    console.log("┌────── ⋆⋅✦⋅⋆ ──────┐");
    console.log("       WINNERS        ");
    console.log(players.filter((player: User) => player.lost === false));
    console.log("└────── ⋆⋅✦⋅⋆ ──────┘");
    players = [];
    bets = [[], [], [], [], [], [], []];
    teeth = [1, 1, 1, 1, 1, 1, 1];
    state = State.CLOSED;

    socket.emit("gameEnded");
    socket.broadcast.emit("gameEnded");
    logState();
  });
};

/*** SOCKET HANDLER ***/
export const handler = async (socket: Socket) => {
  console.log("connection");
  // SET UP STATE
  socket.emit("state", state);
  socket.emit("players", players);
  socket.emit("newBets", bets);
  socket.emit("newTeeth", teeth);

  const session = await getLoginSession(socket.handshake);
  const isStreamer = session && session.id === process.env.TWITCH_ID;
  if (isStreamer) {
    streamerHandlers(socket);
  }

  socket.on("newPlayer", (user) => {
    // if not lobby state do nothing
    if (state !== State.LOBBY) {
      return;
    }

    // add the player if they haven't already joined
    if (!players.find((u: User) => u.id === user.id)) {
      players.push({ ...user, lost: false });
      socket.broadcast.emit("players", players);
    }
    logState();
  });

  socket.on("newBet", (betObj) => {
    // if not betting state do nothing
    if (state !== State.BETTING) {
      return;
    }

    const bet = betObj.bet;
    const user = betObj.user;

    // if the user is not in the list of active players, do nothing
    if (
      !players.find((player) => player.id === user.id && player.lost === false)
    ) {
      return;
    }

    // if the tooth is missing, do nothing
    if (teeth[bet] === 0) {
      return;
    }

    // remove player's previous bet and place new bet
    bets = bets.map((betPlayers: Array<User>) =>
      betPlayers.filter((usr: User) => usr.id !== user.id)
    );
    bets[bet].push(user);

    socket.broadcast.emit("newBets", bets);
    socket.emit("betPlaced", bet);
    logState();
  });
};
