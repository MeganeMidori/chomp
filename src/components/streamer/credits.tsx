import React from "react";

const Betting = ({ closeGame }) => (
  <div>
    <h2>Credits</h2>
    <div>
      <button type="button" onClick={closeGame}>
        End Game
      </button>
    </div>
  </div>
);

export default Betting;
