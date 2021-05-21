import React, { ComponentType, useMemo } from "react";
import { User } from "src/shared/types";
import XrayGraphTooth from "./xrayGraphTooth";

interface Props {
  bets: Array<Array<User>>;
  players: Array<User>;
  startYoinking: () => void;
}

const XrayGraph: ComponentType<Props> = ({ bets, players, startYoinking }) => {
  const bettingPlayers = useMemo(
    () => players.filter((player) => player.lost === false),
    [players]
  );
  return (
    <div className="xray-border">
      <div className="clippy" />
      <div className="xray" />
      <div className="xray-graph">
        {bets.map((_tooth, i) => (
          <XrayGraphTooth bets={bets} players={bettingPlayers} tooth={i} />
        ))}
      </div>
      <div className="xray-notes">
        Bets Placed: {bets.flat(1).length} / {bettingPlayers.length}
        <span className="xray-notes-action">
          <div className="btn btn-paper" onClick={startYoinking}>
            Start Yoinking!
          </div>
        </span>
      </div>
    </div>
  );
};

export default XrayGraph;
