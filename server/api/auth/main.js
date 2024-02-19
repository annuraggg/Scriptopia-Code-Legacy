import express from "express";
import User from "../../schemas/UserSchema.js";
import logger from "../../config/logger.js";
import passport from "./google.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send();
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const jwtObj = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
            fName: user.firstName,
            lName: user.lastName,
            username: user.username,
          };
          res
            .status(200)
            .cookie(
              "jwt",
              jwt.sign(jwtObj, process.env.JWT_SECRET, { expiresIn: "12h" })
            )
            .json({
              token: jwt.sign(jwtObj, process.env.JWT_SECRET, {
                expiresIn: "12h",
              }),
            });
        } else {
          res.status(401).send();
        }
      });
    }
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await User.create({
        firstName: fName,
        lastName: lName,
        email,
        password: hashedPassword,
        accountType: "local",
      });
      res.status(200).send();
    } catch (error) {
      res.status(409).send();
      logger.error(error);
    }
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/auth/google/failed`,
  }),
  async (req, res) => {
    try {
      const auth_type = JSON.parse(req.query.state).auth_type;

      if (auth_type === "login") {
        const user = await User.findOne({ email: req.user.emails[0].value });
        if (!user) {
          res.redirect(
            `${process.env.FRONTEND_URL}/signin?error=google-auth-failed`
          );
        } else {
          const jwtObj = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
            fName: user.firstName,
            lName: user.lastName,
            username: user.username,
          };

          const token = jwt.sign(jwtObj, process.env.JWT_SECRET, {
            expiresIn: "12h",
          });
          res
            .cookie("jwt", token)
            .redirect(process.env.FRONTEND_URL + "/google/success");
        }
      } else if (auth_type === "signup") {
        const user = await User.findOne({ email: req.user.emails[0].value });
        if (!user) {
          const userObj = {
            firstName: req.user.name.givenName,
            lastName: req.user.name.familyName,
            email: req.user.emails[0].value,
            googleId: req.user.id,
            accountType: "google",
          };
          await User.create(userObj);
          res.redirect(`${process.env.FRONTEND_URL}/signup`);
        } else {
          res.redirect(
            `${process.env.FRONTEND_URL}/signup?error=account-already-exists`
          );
        }
      }

      res.status(200).send();
    } catch (error) {
      res.status(500).send();
      logger.error(error);
    }
  }
);

router.get("/google/failed", (req, res) => {
  res.status(404).send();
});

router.get("/google", (req, res, next) => {
  try {
    const auth_type = req?.query?.auth_type;
    passport.authenticate("google", {
      scope: ["email", "profile"],
      session: false,
      passReqToCallback: true,
      state: JSON.stringify({ auth_type }),
    })(req, res, next);
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }
});

export default router;
