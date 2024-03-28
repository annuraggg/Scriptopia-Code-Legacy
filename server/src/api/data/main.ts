import express from "express";
const router = express.Router();
import cities from "./cities.js";

router.use("/cities", cities)

export default router;