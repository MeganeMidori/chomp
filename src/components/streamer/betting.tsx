import React, { ComponentType } from "react";
import { User } from "src/shared/types";
import XrayGraph from "../xrayGraph";

interface Props {
  startYoinking: () => void;
  bets: Array<Array<User>>;
  players: Array<User>;
}

const Betting: ComponentType<Props> = ({ startYoinking, bets, players }) => (
  <div className="betting-container streamer-main-content">
    <div>
      <XrayGraph bets={bets} players={players} startYoinking={startYoinking}/>
    </div>
  </div>
);

export default Betting;
