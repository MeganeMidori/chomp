import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { State } from "src/shared/types";
import NewGameComponent from "src/components/streamer/newGame";
import Lobby from "src/components/streamer/lobby";
import Betting from "src/components/streamer/betting";
import PlayingComponent from "src/components/streamer/playing";
import ThankU4PlayingComponent from "src/components/streamer/thankU4Playing";

export default function Stream() {
  const socket = useMemo(() => io(), [io])
  const [gameState, setGameState] = useState(State.CLOSED);

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
      socket.emit("pong", Date.now());
    });
  }, []);

  return (
    <div>
      <NewGameComponent newGame={newGame} />
      <Lobby />
      <Betting />
      <PlayingComponent />
      <ThankU4PlayingComponent />

    </div>
  );
}
