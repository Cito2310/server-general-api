import { Router } from "express";
import authRouter from "./auth/auth.routes";
import versionRouter from "./version/version.routes";
import userRouter from "./users/mmUser.routes";
import categoryRouter from "./category/category.routes";
import imageRouter from "./image/image.routes";
import productRouter from "./product/product.routes";
import dailySummaryRouter from "./daily-summary/dailySummary.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/version", versionRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/images", imageRouter);
router.use("/products", productRouter);
router.use("/daily-summary", dailySummaryRouter);

export default router;
