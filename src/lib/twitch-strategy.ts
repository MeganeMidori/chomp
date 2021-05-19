import { Strategy } from 'passport-twitch-new';

const twitchStrategy = new Strategy({
  clientID: process.env.TWITCH_CLIENT_ID, 
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  callbackURL: process.env.TWITCH_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
);

export default twitchStrategy;