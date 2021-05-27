import passport, { AuthenticateOptions } from 'passport'
import nextConnect from 'next-connect'
import twitchStrategy from '../../../lib/twitch-strategy'
import { User } from 'src/shared/types';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser<User>(function(user, done) {
  done(null, user);
});

passport.use(twitchStrategy)

export default nextConnect()
  .use(passport.initialize())
  .use(passport.authenticate('twitch', {forceVerify: true} as AuthenticateOptions));
