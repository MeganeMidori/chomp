import React, { ComponentType } from "react";

interface Props {
  login: () => void
}

const NewGameComponent: ComponentType<Props> = ({ login }) => (
  <div>
    <button type="button" onClick={login}>
      Join with twitch
    </button>
  </div>
);

export default NewGameComponent;
