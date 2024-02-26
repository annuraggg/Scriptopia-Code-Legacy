import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
const Strategy = GoogleStrategy.Strategy;
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["email", "profile"]!,
    },
    function (_request: any, _accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user!);
});

export default passport;
