import React, { ComponentType } from "react";
import Alligator from "../alligator";

interface Props {
  teeth: Array<number>;
  bet: number;
  placeBet: (tooth: number) => void;
}

const Betting: ComponentType<Props> = ({ teeth, bet, placeBet }) => (
  <div className="betting-container">
    <div className="betting-container-top">
      <div className="bet-header">
        {bet < 0 ? "Please select a tooth" : `Betting on tooth ${bet + 1}`}
      </div>
    </div>
    <div className="betting-container-bottom">
      <div className="player-main-content">
        {teeth.map((tooth, i) => (
          <button
            type="button"
            onClick={() => placeBet(i)}
            disabled={tooth === 0}
            className={`btn btn-paper btn-full-width ${
              i === bet && "selected"
            }`}
          >
            Tooth {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Betting;
