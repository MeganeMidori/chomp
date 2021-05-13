import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { io } from "socket.io-client";
import { State } from "src/shared/types";
import NewGameComponent from "src/components/player/newGame";
import Lobby from "src/components/player/lobby";
import Betting from "src/components/player/betting";
import PlayingComponent from "src/components/player/playing";
import LossComponent from "src/components/player/loss";
import SuccessComponent from "src/components/player/success";
import ThankU4PlayingComponent from "src/components/player/thankU4Playing";

export default function Home() {
  const [gameState, setGameState] = useState(State.CLOSED);

  useEffect(() => {
    const socket = io();

    socket.on("ping", (message) => {
      console.log("ping", message);
      socket.emit("pong", Date.now());
    });

    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });
  }, []);

  return (
    <div className={styles.container}>
      <NewGameComponent />
      <Lobby />
      <Betting />
      <PlayingComponent />
      <LossComponent />
      <SuccessComponent />
      <ThankU4PlayingComponent />
    </div>
  );
}
