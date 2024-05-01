import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Organization from "@/schemas/OrganizationSchema.js";
import User from "@/schemas/UserSchema.js";
import express from "express";
const router = express.Router();

router.post("/accept", verifyJWT, async (req, res) => {
  try {
    const { id } = req.body;

    // @ts-ignore
    const org = await Organization.findOne({ admins: { $in: [req.user.id] } });
    if (!org) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!org.requesters.includes(id)) {
      res.status(404).json({
        success: false,
        message: "Request not found",
      });
      return;
    }

    org.requesters = org.requesters.filter(
      (requester) => requester.toString() !== id
    );

    org.screeners.push(id);

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.organization = org._id;

    await org.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Request accepted",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_ACC_001", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to accept request",
    });
  }
});

router.post("/reject", verifyJWT, async (req, res) => {
  try {
    const { id } = req.body;

    // @ts-ignore
    const org = await Organization.findOne({ admins: { $in: [req.user.id] } });
    if (!org) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!org.requesters.includes(id)) {
      res.status(404).json({
        success: false,
        message: "Request not found",
      });
      return;
    }

    org.requesters = org.requesters.filter(
      (requester) => requester.toString() !== id
    );

    await org.save();

    res.status(200).json({
      success: true,
      message: "Request rejected",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_REJ_001", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to reject request",
    });
  }
});

export default router;
