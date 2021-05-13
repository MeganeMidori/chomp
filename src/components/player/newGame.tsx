import React from "react";

const NewGameComponent = ({ login }) => (
  <div>
    <button type="button" onClick={login}>
      Join with twitch
    </button>
  </div>
);

export default NewGameComponent;
