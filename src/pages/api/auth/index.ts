import passport from 'passport'
import nextConnect from 'next-connect'
import twitchStrategy from '../../../lib/twitch-strategy'

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(twitchStrategy)

export default nextConnect()
  .use(passport.initialize())
  .use(passport.authenticate('twitch', {forceVerify: true}));
