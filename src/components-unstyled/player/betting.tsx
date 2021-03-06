import React, { ComponentType } from "react";

interface Props {
  teeth: Array<number>,
  bet: number,
  placeBet: (tooth: number) => void 
}

const Betting: ComponentType<Props> = ({ teeth, bet, placeBet }) => (
  <div>
    <h2>Betting on {bet}</h2>
    {teeth.map((tooth, i) => (
      <div>
        <button type="button" onClick={() => placeBet(i)} disabled={tooth === 0}>
          Tooth {i}
        </button>
      </div>
    ))}
  </div>
);

export default Betting;
