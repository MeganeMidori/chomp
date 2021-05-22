import React, { ComponentType } from "react";
import { User } from "src/shared/types";
import Alligator from "../alligator";
import useSound from "use-sound";

interface Props {
  back2Bet: () => void;
  endGame: () => void;
  teeth: Array<number>;
  pickTooth: (tooth: number) => void;
  isOpen: boolean;
  bets: Array<Array<User>>;
  players: Array<User>;
}

const PlayingComponent: ComponentType<Props> = ({
  back2Bet,
  teeth,
  pickTooth,
  isOpen,
  bets,
  players,
}) => {
  const [play] = useSound("clipboard_rustle.mp3", { volume: 0.25 });

  return (
    <div className="playing-container">
      <div className="foo">
        <div className="clipboard" onMouseEnter={play}>
          <div className="clipboard--paper">
            <table>
              <tr>
                <td className="photo">
                  <div>
                    <img src="/xray.jpeg" height="100" />
                  </div>
                </td>
                <td>
                  <div>
                    Name: <span className="handwriting">Al E. Gator</span>
                  </div>
                  <div>
                    Players:{" "}
                    <span className="handwriting">
                      {players.filter((player) => player.lost === false).length}
                    </span>
                  </div>
                </td>
              </tr>
            </table>
            <table>
              {bets.map((_bet, i) => (
                <tr>
                  <td>Tooth {i + 1}</td>
                  <td className="handwriting">
                    {Math.floor((bets[i].length * 10000) / players.length) /
                      100}
                    %
                  </td>
                </tr>
              ))}
            </table>
            <div style={{ padding: "15px" }} className="handwriting">
              Click on the teeth to yoink!
            </div>
            {!isOpen && (
              <div>
                <button
                  className="btn btn-paper"
                  style={{
                    marginTop: "0",
                    marginLeft: "0",
                    position: "absolute",
                    right: "15px",
                    bottom: "30px",
                  }}
                  type="button"
                  onClick={back2Bet}
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="foo">
        <div style={{ width: "1000px" }}>
          <Alligator
            teeth={teeth}
            bet={-1}
            onDown={pickTooth}
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayingComponent;
