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

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });
  }, []);

  const newGame = () => {
    socket.emit("state", State.LOBBY);
  };

  const startBetting = () => {
    socket.emit("state", State.BETTING);
  };

  switch (gameState) {
    case State.CLOSED:
      return <NewGameComponent newGame={newGame} />;
    case State.LOBBY:
      return <Lobby startBetting={startBetting} />;
    case State.BETTING:
      return <Betting />;
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
