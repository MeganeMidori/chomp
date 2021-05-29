import React, { ComponentType } from "react";

interface Props {
  login: () => void;
}

const NewGameComponent: ComponentType<Props> = () => (
  <div className="new-game-container player-main-content">
    <img src="/chomp.png" className="logo" />
    <div className="join-buttons">
      <div>
        <a href="/api/auth" className="btn btn-paper">Join With Twitch!</a>
      </div>
      {/* <div>
        <button type="button" onClick={login} className="btn btn-paper">
          Join as guest
        </button>
      </div> */}
    </div>
    <div className="alligator-containment-zone">
      <img className="alligator-waiting" src="/loading-alligator.gif" />
    </div>
  </div>
);

export default NewGameComponent;
