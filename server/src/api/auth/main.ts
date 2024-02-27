import express from "express";
import User from "../../schemas/UserSchema.js";
import logger from "../../config/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateUsername } from "unique-username-generator";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import verifyJWT from "@/middlewares/verifyJWT.js";
import UserToken from "@/Interfaces/UserToken.js";
import requestIP from "request-ip";
import UserType from "../../Interfaces/User.js";
const client = new OAuth2Client();

interface IpInfo {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  error?: string;
}

const router = express.Router();

const getIP = async (req: express.Request) => {
  const client =
    process.env.NODE_ENV === "production"
      ? requestIP.getClientIp(req)
      : "1.22.128.204";

  const ipInfo = fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOL_API_KEY}&ip=${client}`
  )
    .then(async (res) => {
      const response = await res.json();
      const responseObj: IpInfo = {
        ip: response.ip,
        city: response.city,
        region: response.state_prov,
        country: response.country_name,
      };

      return responseObj;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error fetching IP");
    });

  return ipInfo;
};

const pushIP = async (
  ipInfo: IpInfo,
  id: string,
  sessionID: string,
  agent: string
) => {
  try {
    const user = await User.findById(id);
    user
      ?.updateOne({
        $push: {
          loginHistory: {
            date: new Date(),
            ip: ipInfo.ip,
            location: `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`,
            device: agent,
            sessionID: sessionID,
            valid: true,
          },
        },
      })
      .exec();
  } catch (error) {
    logger.error(error);
    throw new Error("Error pushing IP");
  }
};

const performSecurityLogs = async (req: express.Request, user: UserType) => {
  const sessID = crypto.randomUUID();
  const agent = `${req.useragent?.browser} ${req.useragent?.version} on ${req.useragent?.os}`;

  // @ts-ignore
  const ipInfo: IpInfo = await getIP(req)!;
  // @ts-ignore
  await pushIP(ipInfo, user._id.toString(), sessID, agent);
};

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send();
    } else {
      bcrypt.compare(
        req.body.password,
        user.password!,
        async (_err, result) => {
          const sessID = crypto.randomUUID();
          if (result) {
            const jwtObj = {
              id: user._id,
              email: user.email,
              accountType: user.accountType,
              fName: user.firstName,
              lName: user.lastName,
              username: user.username,
              sessionID: sessID,
            };

            performSecurityLogs(req, user as UserType);

            res
              .status(200)
              .cookie(
                "jwt",
                jwt.sign(jwtObj, process.env.JWT_SECRET!, { expiresIn: "12h" }),
                { httpOnly: false, sameSite: "none", secure: true }
              )
              .json({
                token: jwt.sign(jwtObj, process.env.JWT_SECRET!, {
                  expiresIn: "12h",
                }),
              });
          } else {
            res.status(401).send();
          }
        }
      );
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
    const username = generateUsername("-", 5);

    try {
      const u = await User.create({
        firstName: fName,
        lastName: lName,
        username: username,
        email,
        password: hashedPassword,
        accountType: "local",
      });

      const jwtObj = {
        id: u._id,
        email,
        accountType: "local",
        fName,
        lName,
        username: username,
      };

      const token = jwt.sign(jwtObj, process.env.JWT_SECRET!, {
        expiresIn: "12h",
      });

      performSecurityLogs(req, u as UserType);

      res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: false,
          sameSite: "none",
          secure: true,
        })
        .json({ success: true });
    } catch (error) {
      res.status(409).send();
      logger.error(error);
    }
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }
});

router.post("/google", async (req, res, next) => {
  try {
    const { creds, auth_type } = req.body;
    const token = await client.verifyIdToken({
      idToken: creds.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload: TokenPayload = token.getPayload()!;

    if (auth_type === "signup") {
      const user = await User.findOne({ email: payload.email });
      if (!user) {
        const username = generateUsername("-", 5);
        const userObj = {
          firstName: payload.given_name!,
          lastName: payload.family_name!,
          username: username,
          email: payload.email!,
          googleId: payload.sub!,
          accountType: "google",
        };
        const u = await User.create(userObj);

        const jwtObj = {
          id: u._id,
          email: userObj.email,
          accountType: userObj.accountType,
          fName: userObj.firstName,
          lName: userObj.lastName,
          username: userObj.username,
        };

        performSecurityLogs(req, u as UserType);

        const token = jwt.sign(jwtObj, process.env.JWT_SECRET!, {
          expiresIn: "48h",
        });
        res.status(200).json({ token });
      } else {
        res.status(409).send();
      }
    } else if (auth_type === "signin") {
      const user = await User.findOne({ email: payload.email });
      if (user) {
        const jwtObj = {
          id: user._id,
          email: user.email,
          accountType: user.accountType,
          fName: user.firstName,
          lName: user.lastName,
          username: user.username,
        };
        const token = jwt.sign(jwtObj, process.env.JWT_SECRET!, {
          expiresIn: "48h",
        });

        performSecurityLogs(req, user as UserType);

        res.status(200).json({ token });
      } else {
        res.status(404).send();
      }
    }
  } catch (error) {
    res.status(500).send();
    console.log(error);
    logger.error(error);
  }
  /* try {
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
    // @ts-ignore
    req.logout();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
    logger.error(error);
  }*/
});

router.post("/username", verifyJWT, async (req, res) => {
  try {
    const { username } = req.body;
    await User.updateOne({ _id: (req.user as UserToken).id }, { username });
    res.status(200).send();
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).send();
      return;
    }
    res.status(500).send();
    logger.error(error);
  }
});

export default router;
