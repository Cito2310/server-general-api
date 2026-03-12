import { Router } from "express";
import authRouter from "./auth/auth.routes";
import versionRouter from "./version/version.routes";
import userRouter from "./users/mmUser.routes";
import categoryRouter from "./category/category.routes";
import imageRouter from "./image/image.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/version", versionRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/images", imageRouter);

export default router;
