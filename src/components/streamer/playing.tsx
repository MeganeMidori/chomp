import React from "react";

const CreditsComponent = ({ back2Bet, endGame }) => (
  <div>
    <h2>game in progress</h2>
    <div>
      <button type="button" onClick={back2Bet}>
        back to betting
      </button>
      <button type="button" onClick={endGame}>
        end game
      </button>
    </div>
  </div>
);

export default CreditsComponent;
