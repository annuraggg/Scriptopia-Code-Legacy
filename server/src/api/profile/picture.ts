import verifyJWT from "@/middlewares/verifyJWT";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { newImage } = req.body;

    // @ts-ignore
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) return res.status(404).send("User not found");

    user.image = newImage;
    await user.save();

    res.send("Image updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
