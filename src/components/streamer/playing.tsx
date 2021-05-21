import React, { ComponentType } from "react";
import { User } from "src/shared/types";
import Alligator from "../alligator";

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
}) => (
  <div className="playing-container">
    <div className="clipboard">
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
                Players: <span className="handwriting">{players.filter(player => player.lost === false).length}</span>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Tooth 1</td>
            <td className="handwriting">
              {Math.floor((bets[0].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 2</td>
            <td className="handwriting">
              {Math.floor((bets[1].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 3</td>
            <td className="handwriting">
              {Math.floor((bets[2].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 4</td>
            <td className="handwriting">
              {Math.floor((bets[3].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 5</td>
            <td className="handwriting">
              {Math.floor((bets[4].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 6</td>
            <td className="handwriting">
              {Math.floor((bets[5].length * 10000) / players.length) / 100}%
            </td>
          </tr>
          <tr>
            <td>Tooth 7</td>
            <td className="handwriting">
              {Math.floor((bets[6].length * 10000) / players.length) / 100}%
            </td>
          </tr>
        </table>
        <div style={{ padding: "15px" }} className="handwriting">
          Click on the teeth to yoink!
        </div>
        {!isOpen && (
          <div>
            <button
              className="sticker-button"
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
    <div style={{width: '1000px'}}>
    <Alligator teeth={teeth} bet={-1} onDown={pickTooth} isOpen={isOpen} />
    </div>
  </div>
);

export default PlayingComponent;
