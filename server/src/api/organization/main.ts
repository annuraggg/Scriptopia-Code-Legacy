import express from "express";
const router = express.Router();

import get from "./get";
import join from "./join";
import create from "./create";

router.use("/get", get);
router.use("/join", join);
router.use("/create", create);

export default router;