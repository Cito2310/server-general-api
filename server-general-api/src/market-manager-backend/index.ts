import { Router } from "express";
import authRouter from "./auth/auth.routes";
import versionRouter from "./version/version.routes";
import userRouter from "./users/mmUser.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/version", versionRouter);
router.use("/users", userRouter);

export default router;
