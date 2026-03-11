import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { login } from "./controllers/login";

const router = Router();

router.post(
    "/login",
    [
        body("name").notEmpty().isLength({ max: 99 }).withMessage("Invalid credentials"),
        body("password").notEmpty().isLength({ max: 99 }).withMessage("Invalid credentials"),
    ],
    handleValidation,
    login
);

export default router;
