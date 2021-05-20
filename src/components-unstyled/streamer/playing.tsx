import React, { ComponentType } from "react";

interface Props {
  back2Bet: () => void,
  endGame: () => void,
  teeth: Array<number>,
  pickTooth: (tooth: number) => void,
  isOpen: boolean
}

const PlayingComponent: ComponentType<Props> = ({ back2Bet, teeth, pickTooth, isOpen }) => (
  <div>
    <h2>game in progress</h2>
    {isOpen && (
      <div>
        {teeth.map((tooth, i) => (
          <div>
            <button
              type="button"
              onClick={() => pickTooth(i)}
              disabled={tooth === 0}
            >
              Tooth {i}
            </button>
          </div>
        ))}
      </div>
    )}
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
