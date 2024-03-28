import verifyJWT from "@/middlewares/verifyJWT";
import Organization from "@/schemas/OrganizationSchema";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { name, website, description, email, phone } = req.body;
    if (!name || !website || !description || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // @ts-ignore

    const org = await Organization.create({
      name,
      website,
      description,
      email,
      phone,
      // @ts-ignore
      screeners: [req.user.id],
      ratings: {},
      // @ts-ignore
      admins: [req.user.id],
      code: Math.random().toString(32).substring(4),
    });

    // @ts-ignore
    const u = await User.findById(req.user.id);
    if (u) {
      u.organization = org._id;
      await u.save();
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Organization created successfully",
      organization: org,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create organization",
    });
    console.log(err);
  }
});

export default router;
