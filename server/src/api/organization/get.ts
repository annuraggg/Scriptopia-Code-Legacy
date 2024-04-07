import logger from "@/config/logger";
import verifyJWT from "@/middlewares/verifyJWT";
import Organization from "@/schemas/OrganizationSchema";
import User from "@/schemas/UserSchema";
import express from "express";
import { isDataView } from "util/types";
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const emailVerified = user.emailVerified;
    const phoneVerified = user.phoneVerified;

    if (user?.organization) {
      const organization = await Organization.findById(user.organization);
      const admins = [];
      const screeners = [];
      const requesters = [];

      if (!organization?.admins) {
        return res.status(200).json({
          success: false,
          message: "Organization not found",
        });
      }

      for (const admin of organization?.admins) {
        const adminUser = await User.findById(admin);
        if (adminUser) {
          admins.push({
            name: adminUser.firstName + " " + adminUser.lastName,
            email: adminUser.email,
            id: adminUser._id,
            phone: adminUser.phone,
          });
        }
      }

      if (organization?.admins.includes(user._id)) {
        for (const screener of organization?.screeners) {
          const screenerUser = await User.findById(screener);
          if (screenerUser) {
            screeners.push({
              name: screenerUser?.firstName + " " + screenerUser?.lastName,
              email: screenerUser?.email,
              id: screenerUser._id,
              phone: screenerUser.phone,
            });
          }
        }

        for (const requester of organization?.requesters) {
          const requesterUser = await User.findById(requester);
          if (requesterUser) {
            requesters.push({
              name: requesterUser.firstName + " " + requesterUser.lastName,
              email: requesterUser.email,
              username: requesterUser.username,
              id: requesterUser._id,
              phone: requesterUser.phone,
            });
          }
        }
      }

      res.status(200).json({
        success: true,
        organization: {
          name: organization.name,
          description: organization.description,
          website: organization.website,
          email: organization.email,
          phone: organization.phone,
          code: organization.code,
          ratings: organization.ratings,
          admins,
          screeners,
          requesters,
          isAdmin: organization.admins.includes(user.id),
          emailVerified,
          phoneVerified,
        },
      });
    } else {
      res.status(200).json({
        success: false,
        message: "User not associated with any organization",
        emailVerified: emailVerified,
        phoneVerified: phoneVerified,
      });
    }
  } catch (err) {
    logger.error({ code: "ORG_GET_001", message: err });
    res.status(500).json({
      success: false,
      message: "Failed to fetch organization details",
    });
  }
});

export default router;
