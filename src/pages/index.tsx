import React, { useEffect, useState, useMemo } from "react";
import { useUser } from '../lib/hooks'
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
  const user2 = useUser()

  const socket = useMemo(() => io(), [io]);

  const [gameState, setGameState] = useState(State.CLOSED);
  const [user, setUser] = useState("");
  const [teeth, setTeeth] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [bet, setBet] = useState(-1);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("betPlaced", (bet: number) => {
        console.log("betPlaced", bet);
        setBet(bet);
      });

      socket.on("losers", (losers: Array<string>) => {
        if (lost) {
          return;
        }
        if (losers.indexOf(user) > -1) {
          setLost(true);
        }
      });

      socket.on("newGameRound", (newGameState) => {
        const newTeeth = newGameState.teeth
        const newBets = newGameState.bets
        const newState = newGameState.state
        setTeeth(newTeeth);
        setBet(newBets.indexOf(user));
        setGameState(newState);
      })
    }
  }, [user]);

  const login = () => {
    const newUser = prompt("Please enter your name", "") || "";
    setUser(newUser);
    socket.emit("newPlayer", newUser);
  };

  const placeBet = (tooth: number) => {
    socket.emit("newBet", { bet: tooth, user: user });
  };

  if (!user && gameState !== State.LOBBY) {
    <div>Game in progress</div>;
  }
  if (lost) {
    return <LossComponent />;
  }
  switch (gameState) {
    case State.LOBBY:
      if (user) {
        return <Lobby />;
      }
      return <NewGameComponent login={login} user={user2} />;
    case State.BETTING:
      return <Betting teeth={teeth} bet={bet} placeBet={placeBet} />;
    case State.PLAYING:
      return <PlayingComponent />;
    case State.RESULTS:
      return <SuccessComponent />;
    case State.CREDITS:
    case State.CLOSED:
      return <ThankU4PlayingComponent />;
    default:
      <ThankU4PlayingComponent />;
  }
}
