import UserToken from "@/Interfaces/UserToken.js";

declare namespace Express {
  export interface Request {
    user?: UserToken;
  }
}
