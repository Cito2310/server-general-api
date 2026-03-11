import { Router } from "express";
import { authMMJWT } from "../middlewares/authMMJWT";
import { getVersion } from "./controllers/getVersion";

const router = Router();

router.get("/", authMMJWT, getVersion);

export default router;
