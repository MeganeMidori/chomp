import passport from "passport";
import nextConnect from "next-connect";
import twitchStrategy from "../../../lib/twitch-strategy";
import { setLoginSession } from '../../../lib/auth'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(twitchStrategy);

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const user = await authenticate("twitch", req, res);
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user };
      await setLoginSession(res, session);

      res.redirect("/")
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
