import React from "react";

const Lobby = ({ players, startBetting }) => (
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
