import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { State } from "src/shared/types";
import NewGameComponent from "src/components/streamer/newGame";
import Lobby from "src/components/streamer/lobby";
import Betting from "src/components/streamer/betting";
import PlayingComponent from "src/components/streamer/playing";
import ThankU4PlayingComponent from "src/components/streamer/thankU4Playing";

const Stream = () => {
  const socket = useMemo(() => io(), [io]);

  const [gameState, setGameState] = useState(State.CLOSED);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });

    socket.on("players", (players) => {
      console.log("players", players);
      setPlayers(players);
    })
  }, []);

  const emitGameState = (newState: State) => () => {
    socket.emit("state", newState);
  };

  switch (gameState) {
    case State.CLOSED:
      return <NewGameComponent newGame={emitGameState(State.LOBBY)} />;
    case State.LOBBY:
      return <Lobby players={players} startBetting={emitGameState(State.BETTING)} />;
    case State.BETTING:
      return <Betting startYoinking={emitGameState(State.PLAYING)} />;
    case State.PLAYING:
    case State.RESULTS:
      if (false) {
        return <ThankU4PlayingComponent />;
      }
      return <PlayingComponent />;
    default:
      return <ThankU4PlayingComponent />;
  }
};

export default Stream;
