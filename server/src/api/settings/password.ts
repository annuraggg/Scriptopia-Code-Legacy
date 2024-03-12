import verifyJWT from "@/middlewares/verifyJWT.js";
import User from "@/schemas/UserSchema.js";
import express from "express";
import bcrypt from "bcrypt";
import logger from "@/config/logger.js";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be same as old password" });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 8 characters long" });
    }

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    // @ts-ignore
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const accountType = user.accountType;

    if (accountType === "google" && !user.password) {
      const hashedPass = await bcrypt.hash(newPassword, 10);
      user.password = hashedPass;
      user.accountType = "hybrid";
      await user.save();
      res.json({ message: "Password changed successfully" });
    } else if (
      (accountType === "local" || accountType === "hybrid") &&
      user.password
    ) {
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match)
        return res.status(401).json({ message: "Old password is incorrect" });
      const hashedPass = await bcrypt.hash(newPassword, 10);
      user.password = hashedPass;
      await user.save();
      res.json({ message: "Password changed successfully" });
    }
  } catch (error) {
    logger.error({ code: "SETTINGS-PASSWORD-001", message: error });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
