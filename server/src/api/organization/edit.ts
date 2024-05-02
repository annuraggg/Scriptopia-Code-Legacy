import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Organization from "@/schemas/OrganizationSchema";
import express from "express";
const router = express.Router();

router.post("/", verifyJWT ,async (req, res) => {
  const { email, website, phone } = req.body;

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

    organization.email = email;
    organization.website = website;
    organization.phone = phone;
    organization.save();

    res.status(200).json({
      success: true,
      message: "Organization updated",
    });
  } catch (error) {
    console.log(error);
    logger.error({ code: "ORG_UPD_001", message: error });
    res.status(500).json({
      success: false,
      message: "Failed to update organization",
    });
  }
});

export default router;
