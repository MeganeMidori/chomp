import React, { ComponentType } from "react";
import { User } from "src/shared/types";

interface Props {
  login: () => void,
  user: User
}

const NewGameComponent: ComponentType<Props> = ({ login, user }) => (
  <div>
    {!user && (
      <>
        <a href="/api/auth">Join With Twitch!</a>
        <button type="button" onClick={login}>
          Join as guesst
        </button>
      </>
    )}
    {user && (
      <>
        <div>Hi {user.display_name}!</div>
        <div>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </>
    )}
  </div>
);

export default NewGameComponent;
