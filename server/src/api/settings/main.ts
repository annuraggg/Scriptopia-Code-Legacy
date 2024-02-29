import express from "express";
const router = express.Router();
import recentLogins from "./recentLogins";
import password from "./password";
import tfa from "./tfa";

router.use("/logins", recentLogins);
router.use("/password", password);
router.use("/tfa", tfa);

export default router;