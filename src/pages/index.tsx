import React, { useEffect, useState, useMemo } from "react";
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
  const socket = useMemo(() => io(), [io]);

  const [gameState, setGameState] = useState(State.CLOSED);
  const [user, setUser] = useState("");
  const [teeth, setTeeth] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [bet, setBet] = useState(-1);

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });

    socket.on("betPlaced", (bet: any) => {
      console.log("betPlaced", bet);
      setBet(bet);
    });
  }, []);

  const login = () => {
    const newUser = prompt("Please enter your name", "");
    setUser(newUser);
    socket.emit("newPlayer", newUser);
  };

  const placeBet = (i:any) => {
    console.log(i)
    socket.emit("newBet", { bet: i, user: user });
  };

  switch (gameState) {
    case State.LOBBY:
      if (user) {
        return <Lobby />;
      }
      return <NewGameComponent login={login} />;
    case State.BETTING:
      return <Betting teeth={teeth} bet={bet} placeBet={placeBet}/>;
    case State.PLAYING:
      return <PlayingComponent />;
    case State.RESULTS:
      if (false) {
        return <LossComponent />;
      }
      return <SuccessComponent />;
    case State.CREDITS:
    case State.CLOSED:
      return <ThankU4PlayingComponent />;
    default:
      <ThankU4PlayingComponent />;
  }
}
