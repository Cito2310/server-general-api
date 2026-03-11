import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../middlewares/handleValidation";
import { login } from "./controllers/login";

const router = Router();

router.post("/login",
    body("username")
        .notEmpty().withMessage("username is required")
        .isLength({ min: 3, max: 40 }).withMessage("username must be between 3 and 40 characters"),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 8, max: 40 }).withMessage("password must be between 8 and 40 characters"),
    handleValidation,
    login
);

export default router;
