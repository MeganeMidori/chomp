import React, { ComponentType } from "react";
import { Balloon, BottomBalloon } from "../balloon";

interface Props {
  players: Array<string>;
  startBetting: () => void;
}

const Lobby: ComponentType<Props> = ({ players, startBetting }) => (
  <div className="lobby-container streamer-main-content">
    <Balloon color="mint" top="50" side="-10" position="left" />
    <Balloon color="pink" top="150" side="150" position="left" />
    <Balloon color="pink" top="-40" side="280" position="left" />
    <Balloon color="pink" top="50" side="-10" position="right" />
    <Balloon color="mint" top="-40" side="150" position="right" />
    <Balloon color="pink" top="150" side="280" position="right" />
    <BottomBalloon color="mint" top="-100" side="-50" position="left" />
    <BottomBalloon color="pink" top="-300" side="50" position="left" />
    <BottomBalloon position="right" color="mint" top="-150" side="-100" />

    <div className="join-buttons">
      <img src="/chomp.png" className="logo" />

      <div>
        <button type="button" onClick={startBetting} className="btn btn-paper">
          Start Playing
        </button>
      </div>
      <h2>{players.length} Player{players.length !== 1 && 's'} Waiting...</h2>
    </div>
    <img className="alligator-waiting" src="/loading-alligator.gif" />
  </div>
);

export default Lobby;
