import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../middlewares/handleValidation";
import { authJWT } from "../middlewares/authJWT";
import { getUserMe, createUser, updateUserMe, deleteUserMe } from "./controllers";

const router = Router();

router.get("/me", authJWT, getUserMe);

router.post("/",
    body("username")
        .notEmpty().withMessage("username is required")
        .isLength({ min: 3, max: 40 }).withMessage("username must be between 3 and 40 characters")
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/).withMessage("username must contain at least one letter and only use letters, numbers, _ or -"),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 8, max: 40 }).withMessage("password must be between 8 and 40 characters")
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("password can only contain letters, numbers, _ or -"),
    handleValidation,
    createUser
);

router.put("/me",
    authJWT,
    body("username")
        .optional()
        .isLength({ min: 3, max: 40 }).withMessage("username must be between 3 and 40 characters")
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/).withMessage("username must contain at least one letter and only use letters, numbers, _ or -"),
    body("password")
        .optional()
        .isLength({ min: 8, max: 40 }).withMessage("password must be between 8 and 40 characters")
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("password can only contain letters, numbers, _ or -"),
    handleValidation,
    updateUserMe
);

router.delete("/me", authJWT, deleteUserMe);

export default router;
