import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { State } from "src/shared/types";
import NewGameComponent from "src/components/streamer/newGame";
import Lobby from "src/components/streamer/lobby";
import Betting from "src/components/streamer/betting";
import PlayingComponent from "src/components/streamer/playing";
import ThankU4PlayingComponent from "src/components/streamer/thankU4Playing";
import CreditsComponent from "src/components/streamer/credits";

const calculateNewTeeth = (teeth: Array<number>, badTooth: number) => {
  if (teeth.filter((tooth) => tooth === 1).length <= 2) {
    return [1, 1, 1, 1, 1, 1, 1];
  }
  const newTeeth = [...teeth];
  newTeeth[badTooth] = 0;
  return newTeeth;
};

const Stream = () => {
  const socket = useMemo(() => io(), [io]);

  const [gameState, setGameState] = useState(State.CLOSED);
  const [players, setPlayers] = useState([]);
  const [winners, setWinners] = useState(players);
  const [bets, setBets] = useState([[], [], [], [], [], [], []]);
  const [teeth, setTeeth] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [localTeeth, setLocalTeeth] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [badTooth, setBadTooth] = useState(Math.floor(Math.random() * 7));
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    socket.on("state", (state: State) => {
      console.log("state", state);
      setGameState(state);
    });

    socket.on("players", (players) => {
      console.log("players", players);
      setPlayers(players);
      setWinners(players);
    });

    socket.on("newBets", (newBets) => {
      setBets(newBets);
    });

    socket.on("newGameRound", (newGameState) => {
      const newTeeth = newGameState.teeth;
      const newBets = newGameState.bets;
      const newState = newGameState.state;
      setTeeth(newTeeth);
      setBets(newBets);
      setGameState(newState);
    });

    socket.on("newWinners", (newWinners) => {
      setWinners(newWinners);
    });
  }, []);

  const emitGameState = (newState: State) => () => {
    socket.emit("state", newState);
  };

  const pickTooth = (tooth: number) => {
    if (tooth === badTooth) {
      setIsOpen(false);
      socket.emit("losers", bets[tooth]);
      emitGameState(State.RESULTS)();
      return;
    }
    const newLocalTeeth = localTeeth.map((toothValue, i) => {
      return tooth === i ? 0 : toothValue;
    });
    console.log(tooth, newLocalTeeth, localTeeth);
    setLocalTeeth(newLocalTeeth);
  };

  const back2Bet = () => {
    if (winners.length < 5) {
      // TODO: handle game over
      console.log("END THE GAME");
    }
    setIsOpen(true);
    const newTeeth = calculateNewTeeth(teeth, badTooth);
    socket.emit("endGameRound", { newTeeth: newTeeth });
  };

  const startYoinking = () => {
    const newLosers = winners.filter((player) => bets.flat().indexOf(player) < 0);
    socket.emit("losers", newLosers);
    setLocalTeeth(teeth);
    let nextBadToothCount = Math.floor(Math.random() * teeth.length);
    while (teeth[nextBadToothCount] === 0) {
      nextBadToothCount = (nextBadToothCount + 1) % 7;
    }
    setBadTooth(nextBadToothCount);
    emitGameState(State.PLAYING)();
  };

  switch (gameState) {
    case State.CLOSED:
      return <NewGameComponent newGame={emitGameState(State.LOBBY)} />;
    case State.LOBBY:
      return (
        <Lobby players={players} startBetting={emitGameState(State.BETTING)} />
      );
    case State.BETTING:
      return <Betting startYoinking={startYoinking} bets={bets} />;
    case State.PLAYING:
    case State.RESULTS:
      return (
        <PlayingComponent
          back2Bet={back2Bet}
          endGame={emitGameState(State.CREDITS)}
          teeth={localTeeth}
          pickTooth={pickTooth}
          isOpen={isOpen}
        />
      );
    case State.CREDITS:
      return <CreditsComponent closeGame={emitGameState(State.CLOSED)} />;
    default:
      return <ThankU4PlayingComponent />;
  }
};

export default Stream;
