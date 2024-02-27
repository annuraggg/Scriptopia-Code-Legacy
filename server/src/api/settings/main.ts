import express from "express";
const router = express.Router();
import recentLogins from "./recentLogins";

router.use("/logins", recentLogins);

export default router;