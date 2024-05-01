import express from "express";
import verifyJWT from "@/middlewares/verifyJWT";
import Organization from "@/schemas/OrganizationSchema";
import logger from "@/config/logger";
import User from "@/schemas/UserSchema";
const router = express.Router();

router.post("/remove", verifyJWT, async (req, res) => {
  console.log("Hello");
  const { id } = req.body;
  try {
    const organization = await Organization.findOne({
      // @ts-ignore
      admins: { $in: req.user.id },
    });
    if (!organization) {
      console.log("Organization not found");
      res.status(404).json({
        success: false,
        message: "Organization not found",
      });
      return;
    }

    if (!organization.screeners.includes(id)) {
      res.status(400).json({
        success: false,
        message: "User is not in screeners list",
      });
      return;
    }

    organization.screeners = organization.screeners.filter(
      (screener) => screener != id
    );

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.organization = undefined;

    user.save();
    organization.save();

    res.status(200).json({
      success: true,
      message: "Screener removed from organization",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_ADM_002", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to remove screener from organization",
    });
  }
});

export default router;
