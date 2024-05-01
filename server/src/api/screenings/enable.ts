import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import User from "@/schemas/UserSchema.js";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  const { experience, roles, cities } = req.body;
  if (experience < 1 || experience > 70) {
    return res
      .status(400)
      .json({ message: "Experience cannot be less than 1" });
  }

  if (!roles || roles.length === 0) {
    return res.status(400).json({ message: "Roles cannot be empty" });
  }

  if (!cities || cities.length === 0) {
    return res.status(400).json({ message: "Cities cannot be empty" });
  }

  try {
    // @ts-ignore
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.experience = experience;
    user.enabledScreening = true;
    if (user.jobPreferences) {
      user.jobPreferences.role = roles;
      user.jobPreferences.location = cities;
    }
    await user.save();

    res.json({ message: "Job Preferences updated successfully" });
  } catch (err) {
    logger.error({ code: "SCR_ENA_001", message: err });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
