import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "../lib/hooks";
import { io } from "socket.io-client";
import { State, User } from "src/shared/types";
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
  const [guestUser, setGuestUser] = useState();
  const [teeth, setTeeth] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [bet, setBet] = useState(-1);
  const [lost, setLost] = useState(false);
  const user = useUser() || guestUser;

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });

    socket.on("gameEnded", () => {
      window.location.replace("/api/auth/logout");
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.on("betPlaced", (bet: number) => {
        console.log("betPlaced", bet);
        setBet(bet);
      });

      socket.on("losers", (losers: Array<User>) => {
        if (lost) {
          return;
        }
        if (losers.find((loser) => loser.id === user.id)) {
          setLost(true);
        }
      });

      socket.on("newGameRound", (newGameState) => {
        const newTeeth = newGameState.teeth;
        const newBets = newGameState.bets;
        const newState = newGameState.state;
        setTeeth(newTeeth);
        setBet(newBets.indexOf(user));
        setGameState(newState);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log(user);
      socket.emit("newPlayer", user);
    }
  }, [user]);

  const login = () => {
    const newUser = prompt("Please enter your name", "") || "";
    const userObj = {
      id: `${Math.floor(Math.random() * 1000000000)}`,
      display_name: newUser,
    };
    setGuestUser(userObj);
    socket.emit("newPlayer", userObj);
  };

  const placeBet = (tooth: number) => {
    socket.emit("newBet", { bet: tooth, user: user });
  };

  const route = () => {
    if (!user && gameState !== State.LOBBY && gameState !== State.CLOSED) {
      return <div>Game in progress</div>;
    }
    if (lost) {
      return <LossComponent />;
    }
    switch (gameState) {
      case State.LOBBY:
        if (user) {
          return <Lobby />;
        }
        return <NewGameComponent login={login} />;
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
  };

  return <div className="player-container page-container">{route()}</div>;
}
