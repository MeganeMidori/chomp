import React, { ComponentType } from "react";
import { User } from "src/shared/types";

interface Props {
  closeGame: () => void;
  players: Array<User>;
}

const Betting: ComponentType<Props> = ({ closeGame, players }) => (
  <div>
    <h2>Credits</h2>
    <ul>
      {players
        .filter((player: User) => player.lost === false)
        .map((player) => (
          <li>{player.display_name}</li>
        ))}
    </ul>
    <div>
      <button type="button" onClick={closeGame}>
        End Game
      </button>
    </div>
  </div>
);

export default Betting;
