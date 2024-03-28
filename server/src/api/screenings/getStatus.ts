import verifyJWT from "@/middlewares/verifyJWT";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
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
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
