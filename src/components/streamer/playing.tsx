import React, { ComponentType } from "react";
import Alligator from "../alligator";

interface Props {
  back2Bet: () => void,
  endGame: () => void,
  teeth: Array<number>,
  pickTooth: (tooth: number) => void,
  isOpen: boolean
}

const PlayingComponent: ComponentType<Props> = ({ back2Bet, teeth, pickTooth, isOpen }) => (
  <div className="betting-container">
    <Alligator teeth={teeth} bet={-1} onDown={pickTooth} isOpen={isOpen} />
    {!isOpen && (
      <div>
        <div>OUCH</div>
        <div>
          <button type="button" onClick={back2Bet}>
            back to betting
          </button>
        </div>
      </div>
    )}
    {/* <div>
      <button type="button" onClick={back2Bet}>
        back to betting
      </button>
      <button type="button" onClick={endGame}>
        end game
      </button>
    </div> */}
  </div>
);

export default PlayingComponent;
