import mongoose from "mongoose";
import logger from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/${process.env.MONGODB_DATABASE}`
  )
  .then(() => {
    logger.info({ code: "MONGOOSE-CONNECT", message: "Connected to MongoDB" });
  })
  .catch((err) => {
    logger.error({ code: "MONGOOSE-CONNECT", message: err });
  });
