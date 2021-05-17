import React, { ComponentType } from "react";

interface Props {
  newGame: () => void
}

const NewGameComponent: ComponentType<Props> = ({ newGame }) => (
  <div>
    <button type="button" onClick={newGame}>
      Start Game
    </button>
  </div>
);

export default NewGameComponent;
