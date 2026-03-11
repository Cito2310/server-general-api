import { Router } from "express";
import { handleValidation } from "../../middlewares/handleValidation";
import { sanitizeString } from "../middlewares/sanitizeString";
import { login } from "./controllers/login";

const router = Router();

router.post(
    "/login",
    [
        sanitizeString("name").notEmpty().isLength({ max: 99 }).withMessage("Invalid credentials"),
        sanitizeString("password").notEmpty().isLength({ max: 99 }).withMessage("Invalid credentials"),
    ],
    handleValidation,
    login
);

export default router;
