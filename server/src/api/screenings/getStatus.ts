import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import User from "@/schemas/UserSchema.js";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dataObj = {
      enabledScreening: user.enabledScreening,
      organization: user.organization || null,
    };

    return res.status(200).json(dataObj);
  } catch (err) {
    logger.error({ code: "SCR_GETSTAT_001", message: err });
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
