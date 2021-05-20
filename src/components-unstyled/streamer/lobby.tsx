import React, { ComponentType } from "react";

interface Props {
  players: Array<string>,
  startBetting: () => void
}

const Lobby: ComponentType<Props> = ({ players, startBetting }) => (
  <div>
    <h2>lobby</h2>
    <div>{players.length} players in lobby...</div>
    <div>
      <button type="button" onClick={startBetting}>
        Start Playing
      </button>
    </div>
  </div>
);

export default Lobby;
