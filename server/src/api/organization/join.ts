import verifyJWT from "@/middlewares/verifyJWT";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  const { code } = req.body;
  try {
    // @ts-ignore
    const organization = await Organization.findOne({ code });
    if (!organization) {
      res.status(404).json({
        success: false,
        message: "Organization not found",
      });
      return;
    }

    // @ts-ignore
    const user = await User.findById(req.user.id);
    user.organization = organization._id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Request sent to join organization",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to join organization",
    });
  }
});

export default router;
