import sendMail from "@/api/settings/verify/sendMail";
import verifyJWT from "@/middlewares/verifyJWT";
import OTP from "@/schemas/OTPSchema";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  // @ts-expect-error - req has user
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { email, phone, emailVerified, phoneVerified } = user;
    return res.status(200).json({ email, phone, emailVerified, phoneVerified });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/email/send", verifyJWT, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const resp = await sendMail(email);

    if (resp.success) {
      const rand = Math.random().toString(36).substring(7);
      const otpDB = await OTP.create({
        email,
        otp: resp.otp,
        randomID: rand,
      });

      if (otpDB) {
        return res.status(200).json({ message: "Email sent successfully", randomID: rand});
      } else {
        console.error("ERR: Failed to save OTP to database");
        return res.status(500).json({ message: "Failed to send email" });
      }
    } else {
      console.error("ERR");
      console.error(resp);
      return res.status(500).json({ message: resp.message });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/email/verify", verifyJWT, async (req, res) => {
  const { email, otp, randomID } = req.body;
  if (!email || !otp || !randomID) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }


  const otpDB = await OTP.findOne({ email, otp, randomID });
  if (!otpDB) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpDB.deleteOne();

  // @ts-expect-error - req has user
  const user = await User.findOneAndUpdate({ _id: req.user.id }, { emailVerified: true });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "Email verified successfully" });
});

export default router;
