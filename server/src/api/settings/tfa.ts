import verifyJWT from "@/middlewares/verifyJWT.js";
import { randomBytes } from "crypto";
import express from "express";
import * as OTPAuth from "otpauth";
import hb32 from "hi-base32";
import User from "@/schemas/UserSchema.js";
import logger from "@/config/logger.js";
const router = express.Router();


const generateSecret = () => {
  try {
    const buffer = randomBytes(14);
    const base32 = hb32.encode(buffer).replace(/=/g, "").substring(0, 24);
    return base32;
  } catch (error) {
    logger.error({ code: "SETTINGS-TFA-GENERATE_SECRET", message: error });
  }
};

const generateRecoveryCodes = () => {
  try {
    const recoveryCodes = [];
    for (let i = 0; i < 10; i++) {
      const code = Math.floor(Math.random() * 9000000000) + 1000000000; // Generate a 10-digit random number
      recoveryCodes.push({
        code: code,
        used: false,
      });
    }
    return recoveryCodes;
  } catch (error) {
    logger.error({
      code: "SETTINGS-TFA-GENERATE_RECOVERY_CODES",
      message: error,
    });
  }
};

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { enabled } = req.body;
    if (!enabled) {
      const secret = generateSecret();
      const totp = new OTPAuth.TOTP({
        issuer: "Scriptopia",
        // @ts-ignore
        label: req.user ? req.user.email : "user",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: secret,
      });

      const code = totp.toString();
      res.json({ code, secret: secret });
    }
  } catch (error) {
    logger.error({ code: "SETTINGS-TFA-ROOT", message: error });
    res.status(500).send();
  }
});

router.post("/verify", verifyJWT, async (req, res) => {
  try {
    const { totp, secret } = req.body;
    const totpCheck = new OTPAuth.TOTP({
      issuer: "Scriptopia",
      // @ts-ignore
      label: req.user ? req.user.username : "user",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: secret,
    });

    console.log(totpCheck.validate({ token: totp, window: 2 }));
    if (totpCheck.validate({ token: totp, window: 2 }) === 0) {
      const recoveryCodes = generateRecoveryCodes();

      if (req.user) {
        // @ts-ignore
        const user = await User.findOne({ email: req.user.email });
        if (user) {
          user.tfa = {
            enabled: true,
            secret: secret,
            createdAt: new Date(),
            // @ts-ignore
            recoveryCodes: recoveryCodes,
          };

          await user.save();
        }
      }

      res.json({ message: "Two Factor Authentication Enabled", recoveryCodes });
    } else {
      res.status(400).json({ message: "Invalid TOTP" });
    }
  } catch (error) {
    logger.error({ code: "SETTINGS-TFA-VERIFY", message: error });
    res.status(500).send();
  }
});

router.post("/status", verifyJWT, async (req, res) => {
  try {
    if (req.user) {
      // @ts-ignore
      const user = await User.findOne({ email: req.user.email });
      if (user && user.tfa) {
        res.json({
          enabled: user.tfa.enabled,
          recoveryCodes: user.tfa.recoveryCodes,
        });
      }
    }
  } catch (error) {
    logger.error({ code: "SETTINGS-TFA-STATUS", message: error });
    res.status(500).send();
  }
});

router.post("/disable", verifyJWT, async (req, res) => {
  try {
    if (req.user) {
      // @ts-ignore
      const user = await User.findOne({ email: req.user.email });
      if (user) {
        user.tfa = {
          enabled: false,
          secret: "",
          createdAt: new Date(),
          // @ts-ignore
          recoveryCodes: [],
        };

        await user.save();
      }
    }
    res.json({ message: "Two Factor Authentication Disabled" });
  } catch (error) {
    logger.error({ code: "SETTINGS-TFA-DISABLE", message: error });
    res.status(500).send();
  }
});

export default router;
