import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { authMMJWT } from "../middlewares/authMMJWT";
import { requireRole } from "../middlewares/requireRole";
import { sanitizeString } from "../middlewares/sanitizeString";
import { getUsers, createUser, updateUser, deleteUser } from "./controllers";

const router = Router();

router.get("/", authMMJWT, getUsers);

router.post(
    "/",
    authMMJWT,
    requireRole("admin"),
    [
        sanitizeString("name").notEmpty().withMessage("Name is required").isLength({ max: 16 }).withMessage("Name must be 16 characters or less").matches(/^[a-zA-Z0-9_-]+$/).withMessage("Name can only contain letters, numbers, - and _"),
        sanitizeString("password").notEmpty().withMessage("Password is required").isLength({ max: 16 }).withMessage("Password must be 16 characters or less").matches(/^[a-zA-Z0-9_-]+$/).withMessage("Password can only contain letters, numbers, - and _"),
        body("role").notEmpty().withMessage("Role is required").isIn(["admin", "cajero", "encargado"]).withMessage("Role must be admin, cajero or encargado"),
    ],
    handleValidation,
    createUser
);

router.put(
    "/:id",
    authMMJWT,
    requireRole("admin"),
    [
        sanitizeString("name").optional().notEmpty().withMessage("Name cannot be empty").isLength({ max: 16 }).withMessage("Name must be 16 characters or less").matches(/^[a-zA-Z0-9_-]+$/).withMessage("Name can only contain letters, numbers, - and _"),
        sanitizeString("password").optional().notEmpty().withMessage("Password cannot be empty").isLength({ max: 16 }).withMessage("Password must be 16 characters or less").matches(/^[a-zA-Z0-9_-]+$/).withMessage("Password can only contain letters, numbers, - and _"),
        body("role").optional().isIn(["admin", "cajero", "encargado"]).withMessage("Role must be admin, cajero or encargado"),
    ],
    handleValidation,
    updateUser
);

router.delete("/:id", authMMJWT, requireRole("admin"), deleteUser);

export default router;
