import { Router } from "express";
import authRouter from "./auth/auth.routes";
import versionRouter from "./version/version.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/version", versionRouter);

export default router;
