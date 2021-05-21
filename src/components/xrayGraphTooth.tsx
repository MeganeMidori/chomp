import React, { ComponentType } from "react";
import { User } from "src/shared/types";

interface Props {
  bets: Array<Array<User>>;
  players: Array<User>;
  tooth: number;
}

const XrayGraphTooth: ComponentType<Props> = ({ bets, players, tooth }) => (
  <div
    className={`xray-graph-tooth xray-graph-tooth-${tooth + 1}`}
    style={{
      height: `${
        window.innerWidth * 0.02 +
        (bets[tooth].length * (window.innerWidth / 2)) / players.length
      }px`,
    }}
  >
    <span className="xray-tooltip">
      Tooth {tooth + 1}: {bets[tooth].length} (
      {Math.floor(
        (bets[tooth].length * 10000) /
          bets.reduce((acc, bet) => acc + bet.length, 0)
      ) / 100}
      %)
    </span>
  </div>
);

export default XrayGraphTooth;
