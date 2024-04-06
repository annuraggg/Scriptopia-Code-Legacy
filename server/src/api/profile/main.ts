import verifyJWT from "@/middlewares/verifyJWT";
import User from "@/schemas/UserSchema";
import express from "express"
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
    // @ts-ignore
    const user = await User.findById(req?.user?.id);
    return res.status(200).json({ user });
})

export default router;