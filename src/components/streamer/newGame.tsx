import React, { ComponentType } from "react";

interface Props {
  newGame: () => void;
}

const NewGameComponent: ComponentType<Props> = ({ newGame }) => (
  <div className="new-game-container streamer-main-content">
    <button type="button" onClick={newGame} className="btn btn-paper">
      Start Game
    </button>
  </div>
);

export default NewGameComponent;
