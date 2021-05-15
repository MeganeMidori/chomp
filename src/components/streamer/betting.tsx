import React from "react";

const Betting = ({ startYoinking, bets }) => (
  <div>
    <h2>betting</h2>
    <div>
      <ul>
        {bets.map((bet: any, i: any) => (
          <li>
            Tooth {i}: {bet.length}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <button type="button" onClick={startYoinking}>
        Start Yoinking
      </button>
    </div>
  </div>
);

export default Betting;
