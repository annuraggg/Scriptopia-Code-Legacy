import mongoose from "mongoose";
import logger from "./logger.js";

mongoose
  .connect(
    "mongodb+srv://annuragggg:RMQVlqvpszY9XEzf@mainserver.js8thqj.mongodb.net/scriptopia"
  )
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Could not connect to MongoDB", err);
  });
