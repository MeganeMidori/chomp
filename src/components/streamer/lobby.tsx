import React from "react";

const Lobby = ({ startBetting }) => (
  <div>
    <h2>lobby</h2>
    <div>
      <button type="button" onClick={startBetting}>
        Start Playing
      </button>
    </div>
  </div>
);

export default Lobby;
