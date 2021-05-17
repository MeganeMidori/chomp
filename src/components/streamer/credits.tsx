import React, { ComponentType } from "react";

interface  Props {
  closeGame: () => void
}

const Betting: ComponentType<Props> = ({ closeGame }) => (
  <div>
    <h2>Credits</h2>
    <div>
      <button type="button" onClick={closeGame}>
        End Game
      </button>
    </div>
  </div>
);

export default Betting;
