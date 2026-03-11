import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { login } from "./controllers/login";

const router = Router();

router.post(
    "/login",
    [
        body("name").notEmpty().withMessage("Name is required").isLength({ max: 99 }).withMessage("Name must be less than 99 characters"),
        body("password").notEmpty().withMessage("Password is required").isLength({ max: 99 }).withMessage("Password must be less than 99 characters"),
    ],
    handleValidation,
    login
);

export default router;
