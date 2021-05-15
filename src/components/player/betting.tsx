import React from "react";

const Betting = ({ teeth, bet, placeBet }) => (
  <div>
    <h2>Betting on {bet}</h2>
    {teeth.map((tooth, i: any) => (
      <div>
        <button type="button" onClick={() => placeBet(i)} disabled={tooth === 0}>
          Tooth {i}
        </button>
      </div>
    ))}
  </div>
);

export default Betting;
