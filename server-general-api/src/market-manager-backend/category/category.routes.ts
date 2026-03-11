import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { authMMJWT } from "../middlewares/authMMJWT";
import { requireRole } from "../middlewares/requireRole";
import { sanitizeString } from "../middlewares/sanitizeString";
import { getCategories, createCategory, updateCategory, deleteCategory } from "./controllers";

const router = Router();

router.get("/", authMMJWT, getCategories);

router.post(
    "/",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        sanitizeString("name").notEmpty().withMessage("Name is required").isLength({ max: 32 }).withMessage("Name must be 32 characters or less"),
        sanitizeString("primary").notEmpty().withMessage("Primary is required").isLength({ max: 32 }).withMessage("Primary must be 32 characters or less"),
        body("subcategories").optional().isArray().withMessage("Subcategories must be an array"),
        sanitizeString("subcategories.*.name").notEmpty().withMessage("Subcategory name is required").isLength({ max: 32 }).withMessage("Subcategory name must be 32 characters or less"),
        body("subcategories.*.brands").optional().isArray().withMessage("Brands must be an array"),
        sanitizeString("subcategories.*.brands.*").optional().isLength({ max: 32 }).withMessage("Brand must be 32 characters or less"),
    ],
    handleValidation,
    createCategory
);

router.put(
    "/:id",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        sanitizeString("name").optional().notEmpty().withMessage("Name cannot be empty").isLength({ max: 32 }).withMessage("Name must be 32 characters or less"),
        sanitizeString("primary").optional().notEmpty().withMessage("Primary cannot be empty").isLength({ max: 32 }).withMessage("Primary must be 32 characters or less"),
        body("subcategories").optional().isArray().withMessage("Subcategories must be an array"),
        sanitizeString("subcategories.*.name").optional().notEmpty().withMessage("Subcategory name cannot be empty").isLength({ max: 32 }).withMessage("Subcategory name must be 32 characters or less"),
        body("subcategories.*.brands").optional().isArray().withMessage("Brands must be an array"),
        sanitizeString("subcategories.*.brands.*").optional().isLength({ max: 32 }).withMessage("Brand must be 32 characters or less"),
        body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
    ],
    handleValidation,
    updateCategory
);

router.delete("/:id", authMMJWT, requireRole("admin", "encargado"), deleteCategory);

export default router;
