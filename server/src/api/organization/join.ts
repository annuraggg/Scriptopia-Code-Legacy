import logger from "@/config/logger.js";
import verifyJWT from "@/middlewares/verifyJWT.js";
import Organization from "@/schemas/OrganizationSchema.js";
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
    if (organization.requesters.includes(req.user.id)) {
      res.status(400).json({
        success: false,
        message: "Request already sent",
      });
      return;
    }

    // @ts-ignore
    organization.requesters.push(req.user.id);
    organization.save();

    res.status(200).json({
      success: true,
      message: "Request sent to join organization",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_JOI_001", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to join organization",
    });
  }
});

export default router;
