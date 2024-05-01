import bodyParser from "body-parser";
import cors from "cors";
import expressSession from "express-session";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";
import { rateLimit } from "express-rate-limit";

import "./logger.js";
import "./mongoose.js";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL!,
      "http://localhost:5173",
      "https://scriptopia-code.anuragsawant.tech",
      "https://scriptopia-code.anuragsawant.in"
    ],
    credentials: true,
  },
});

/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});*/

dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(useragent.express());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.set("io", io);

process.env.NODE_ENV === "production" //&& app.use(limiter);
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL!,
      "http://localhost:5173",
      "https://scriptopia-code.anuragsawant.tech",
      "https://scriptopia-code.anuragsawant.in"
    ],
    credentials: true,
  })
);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
  })
);

export default app;
