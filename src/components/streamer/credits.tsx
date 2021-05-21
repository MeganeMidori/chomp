import React, { ComponentType } from "react";
import { User } from "src/shared/types";

interface Props {
  closeGame: () => void;
  players: Array<User>;
}

const Betting: ComponentType<Props> = ({ closeGame, players }) => (
  <div>
    <h2>Credits</h2>
    <h3>Winners</h3>
    <ul>
      {players
        .filter((player: User) => player.lost === false)
        .map((player) => (
          <li>{player.display_name}</li>
        ))}
    </ul>
    <h3>Players</h3>
    <ul>
       {players
        .filter((player: User) => player.lost === true)
        .map((player) => (
          <li>{player.display_name}</li>
        ))}
    </ul>
    <h3>Developers</h3>
    <ul>
      <li>Pj-hime</li>
      <li>Sidney Keese</li>
    </ul>
    <h3>Sound Design</h3>
    <ul>
      <li>Josh Hou</li>
    </ul>
    <h3>Playtesters</h3>
    <ul>
      <li></li>
    </ul>
    <div>
      <button type="button" onClick={closeGame}>
        End Game
      </button>
    </div>
  </div>
);

export default Betting;
