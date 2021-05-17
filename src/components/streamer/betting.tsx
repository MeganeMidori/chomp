import React, { ComponentType } from "react";

interface Props {
  startYoinking: () => void,
  bets: Array<Array<string>>
}

const Betting: ComponentType<Props> = ({ startYoinking, bets }) => (
  <div>
    <h2>betting</h2>
    <div>
      <ul>
        {bets.map((bet, i) => (
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
