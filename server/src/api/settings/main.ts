import express from "express";
const router = express.Router();
import recentLogins from "./recentLogins.js";
import password from "./password.js";
import tfa from "./tfa.js";
import contact from "./contact.js";

router.use("/logins", recentLogins);
router.use("/password", password);
router.use("/tfa", tfa);
router.use("/contact", contact);

export default router;
