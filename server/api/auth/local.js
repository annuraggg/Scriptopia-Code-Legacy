import passport from "passport";
import Local from "passport-local";
import User from "../../schemas/UserSchema.js";

const Strategy = Local.Strategy;

passport.use(
  new Strategy((username, password, done) => {
    console.log("PASSPORT LOCAL");
    console.log(username);
    console.log(password)
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

export default passport;
