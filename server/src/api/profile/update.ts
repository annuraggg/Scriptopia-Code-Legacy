import verifyJWT from "@/middlewares/verifyJWT";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  const { firstName, lastName, bio, github, linkedin, website } = req.body;
  try {
    // @ts-ignore
    const user = await User.findById(req?.user?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.bio = bio;

    user.links = user.links || {};

    user.links.github = github;
    user.links.linkedin = linkedin;
    user.links.website = website;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
