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
import * as OTPAuth from "otpauth";
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
      logger.error({ code: "AUTH-GETIP", message: err });
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
            expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
          },
        },
      })
      .exec();
  } catch (error) {
    logger.error({ code: "AUTH-PUSHIP", message: error });
    throw new Error("Error pushing IP");
  }
};

const performSecurityLogs = async (
  req: express.Request,
  user: UserType,
  sessID: string
) => {
  try {
    const agent = `${req.useragent?.browser} ${req.useragent?.version} on ${req.useragent?.os}`;
    // @ts-ignore
    const ipInfo: IpInfo = await getIP(req)!;
    // @ts-ignore
    await pushIP(ipInfo, user._id.toString(), sessID, agent);
  } catch (error) {
    logger.error({ code: "AUTH-PERFORMSECURITYLOGS", message: error });
    throw new Error("Error performing security logs");
  }
};

const createJWT = (user: UserType, sessID: string) => {
  try {
    const jwtObj: UserToken = {
      id: user._id.toString(),
      email: user.email,
      accountType: user.accountType,
      firstName: user.firstName,
      lastName: user.lastName || "",
      username: user.username,
      sessionID: sessID,
    };

    return jwt.sign(jwtObj, process.env.JWT_SECRET!, {
      expiresIn: "48h",
    });
  } catch (error) {
    logger.error({ code: "AUTH-CREATEJWT", message: error });
    throw new Error("Error creating JWT");
  }
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
          if (result) {
            if (!user.tfa?.enabled) {
              const sessID = crypto.randomUUID();
              performSecurityLogs(req, user as unknown as UserType, sessID);
              const token = createJWT(user as unknown as UserType, sessID);

              res
                .status(200)
                .cookie("jwt", token, {
                  httpOnly: false,
                  sameSite: "none",
                  secure: true,
                })
                .json({ token: token });
            } else {
              const randomID = crypto.randomUUID();
              const idJwt = jwt.sign(
                { id: user._id, rand: randomID },
                process.env.JWT_SECRET!,
                {
                  expiresIn: "5m",
                }
              );
              res.status(200).json({ tfa: true, id: user._id, token: idJwt });
            }
          } else {
            res.status(401).send();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send();
    logger.error({ code: "AUTH-LOGIN", message: error })
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

      const sessID = crypto.randomUUID();
      const token = createJWT(u as unknown as UserType, sessID);
      performSecurityLogs(req, u as unknown as UserType, sessID);

      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(409).send();
      logger.error({ code: "AUTH-REGISTER-001", message: error })
    }
  } catch (error) {
    res.status(500).send();
    logger.error({ code: "AUTH-REGISTER-002", message: error })
  }
});

router.post("/google", async (req, res) => {
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
        const sessID = crypto.randomUUID();
        const token = createJWT(u as unknown as UserType, sessID);
        performSecurityLogs(req, u as unknown as UserType, sessID);

        res.status(200).json({ token });
      } else {
        res.status(409).send();
      }
    } else if (auth_type === "signin") {
      const user = await User.findOne({ email: payload.email });
      if (user) {
        if (!user.tfa?.enabled) {
          const sessID = crypto.randomUUID();
          const token = createJWT(user as unknown as UserType, sessID);
          performSecurityLogs(req, user as unknown as UserType, sessID);

          res.status(200).json({ token });
        } else {
          const randomID = crypto.randomUUID();
          const idJwt = jwt.sign(
            { id: user._id, rand: randomID },
            process.env.JWT_SECRET!,
            {
              expiresIn: "5m",
            }
          );
          res.status(200).json({ tfa: true, id: user._id, token: idJwt });
        }
      } else {
        res.status(404).send();
      }
    }
  } catch (error) {
    res.status(500).send();
    logger.error({ code: "AUTH-GOOGLE", message: error })
  }
});

router.post("/username", verifyJWT, async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).send();
      return;
    }

    user.username = username;
    await user.save();

    const sessID = crypto.randomUUID();
    const token = createJWT(user as unknown as UserType, sessID);

    res.status(200).json({ token });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).send();
      return;
    }
    res.status(500).send();
    logger.error({ code: "AUTH-USERNAME", message: error })
  }
});

router.post("/tfa/verify", async (req, res) => {
  try {
    const { code, id, token } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send();
      return;
    }

    const secret = user.tfa?.secret;
    if (!secret) {
      res.status(404).send();
      return;
    }

    const totp = new OTPAuth.TOTP({
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret,
    });

    if (totp.validate({ token: code, window: 2 }) === 0) {
      // @ts-ignore
      const decoded: {
        id: string;
        rand: string;
      } = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded?.id === user._id.toString()) {
        const sessID = crypto.randomUUID();
        const newToken = createJWT(user as unknown as UserType, sessID);
        performSecurityLogs(req, user as unknown as UserType, sessID);
        res.status(200).json({ token: newToken });
      } else {
        res.status(400).send();
      }
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(500).send();
    logger.error({ code: "AUTH-TFA-VERIFY", message: error })
  }
});

export default router;
