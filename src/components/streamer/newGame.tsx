import React from "react";

const NewGameComponent = ({ newGame }) => (
  <div>
    <button type="button" onClick={newGame}>
      Start Game
    </button>
  </div>
);

export default NewGameComponent;
