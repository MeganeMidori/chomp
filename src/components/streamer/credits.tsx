import React, { ComponentType, useEffect } from "react";
import { User } from "src/shared/types";

interface Props {
  closeGame: () => void;
  players: Array<User>;
}

const Betting: ComponentType<Props> = ({ closeGame, players }) => {
  useEffect(() => {
    const scrollCredits = () => {
      if (
        document.getElementById("credits")!.scrollHeight -
          document.getElementById("credits")!.offsetHeight <=
        document.getElementById("credits")!.scrollTop
      ) {
        clearInterval(scroller);
      }
      document.getElementById("credits")!.scrollTop =
        document.getElementById("credits")!.scrollTop + 1;
    };

    const scroller = setInterval(scrollCredits, 10);

    () => {
      clearInterval(scroller);
    };
  }, []);
  return (
    <div className="credits-container streamer-main-content" id="credits">
      <div>
        <div style={{ height: "50vh" }} />
        <div style={{ height: "50vh" }} />
        <h2>Thank you for playing!!!</h2>
        <div>
          <img src="/chomp.png" className="logo" />
        </div>
        <h3>Winners</h3>
        <ul>
          {players
            .filter((player: User) => player.lost === false)
            .map((player) => (
              <li className="btn btn-paper">{player.display_name}</li>
            ))}
        </ul>
        <h3>Players</h3>
        <ul>
          {players
            .filter((player: User) => player.lost === true)
            .map((player) => (
              <li className="btn btn-paper">{player.display_name}</li>
            ))}
        </ul>
        <img src="/loading-alligator.gif" className="logo logo-small" />
        <h3>Developers</h3>
        <ul>
          <li className="btn btn-paper">Pj-hime</li>
          <li className="btn btn-paper">Sidke</li>
        </ul>
        <h3>Sound Design</h3>
        <ul>
          <li className="btn btn-paper">Josh Hou</li>
        </ul>
        <h3>Playtesters</h3>
        <ul>
          <li></li>
        </ul>
        <div style={{ height: "50vh" }} />
        <div style={{textAlign: 'center'}}>
          <button type="button" onClick={closeGame} className="btn btn-paper">
            Play Again?
          </button>
        </div>
        <div style={{ height: "50vh" }} />
      </div>
    </div>
  );
};

export default Betting;
