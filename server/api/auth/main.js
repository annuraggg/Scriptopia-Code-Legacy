import express from "express";
import User from "../../schemas/UserSchema.js";
import logger from "../../config/logger.js";
import localPassport from "./local.js";
import passport from "./google.js";

const router = express.Router();

router.post("/login", (req, res) => {
  localPassport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).send;
      logger.error(err);
    }
    if (!user) {
      res.status(404).send;
    }
    req.logIn(user, (err) => {
      if (err) {
        res.status(500).send;
        logger.error(err);
      }
      res.status(200).send;
    });
  });
});

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.status(500).send;
      logger.error(err);
    } else {
      res.status(200).send;
    }
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failed" }),
  async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      const userObj = {
        firstName: req.user.name.givenName,
        lastName: req.user.name.familyName,
        email: req.user.emails[0].value,
        googleId: req.user.id,
        accountType: "google",
      };

      console.log(JSON.stringify(userObj));
      const createTrue = await User.create(userObj);
      if (!createTrue) {
        res.status(500).send;
      }
    }

    res.status(200).send;
  }
);

router.get("/google/failed", (req, res) => {
  res.status(404).send;
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send;
});

export default router;
