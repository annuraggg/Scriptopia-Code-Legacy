import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Organization from "@/schemas/OrganizationSchema";
import User from "@/schemas/UserSchema";
import express from "express";
const router = express.Router();

router.post("/add", verifyJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const organization = await Organization.findOne({
      // @ts-ignore
      admins: { $in: [req.user.id] },
    });
    if (!organization) {
      res.status(404).json({
        success: false,
        message: "Organization not found",
      });
      return;
    }

    if (organization.admins.includes(id)) {
      res.status(400).json({
        success: false,
        message: "User is already an admin",
      });
      return;
    }

    organization.admins.push(id);
    organization.screeners = organization.screeners.filter(
      (screener) => screener != id
    );
    organization.save();

    res.status(200).json({
      success: true,
      message: "Admin added to organization",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_ADM_001", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to add admin to organization",
    });
  }
});

router.post("/remove", verifyJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const organization = await Organization.findOne({
      // @ts-ignore
      admins: { $in: [req.user.id] },
    });
    if (!organization) {
      res.status(404).json({
        success: false,
        message: "Organization not found",
      });
      return;
    }

    if (!organization.admins.includes(id)) {
      res.status(400).json({
        success: false,
        message: "User is not an admin",
      });
      return;
    }

    organization.admins = organization.admins.filter((admin) => admin != id);

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
      message: "Admin removed from organization",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_ADM_002", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to remove admin from organization",
    });
  }
});

router.post("/demote", verifyJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const organization = await Organization.findOne({
      // @ts-ignore
      admins: { $in: [req.user.id] },
    });
    if (!organization) {
      res.status(404).json({
        success: false,
        message: "Organization not found",
      });
      return;
    }

    if (!organization.admins.includes(id)) {
      res.status(400).json({
        success: false,
        message: "User is not an admin",
      });
      return;
    }

    organization.screeners.push(id);
    organization.admins = organization.admins.filter((admin) => admin != id);
    organization.save();

    res.status(200).json({
      success: true,
      message: "Admin demoted to screener",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_ADM_003", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to demote admin to screener",
    });
  }
});

export default router;
