import { Strategy } from "passport-twitch-new";
import { User } from "src/shared/types";

const twitchStrategy = new Strategy<User>(
  {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: process.env.TWITCH_CALLBACK_URL,
  },
  function (_accessToken, _refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
);

export default twitchStrategy;
