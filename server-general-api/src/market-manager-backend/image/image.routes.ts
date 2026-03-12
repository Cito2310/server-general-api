import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { authMMJWT } from "../middlewares/authMMJWT";
import { requireRole } from "../middlewares/requireRole";
import { sanitizeString } from "../middlewares/sanitizeString";
import { getImages, getImage, createImage, updateImage, deleteImage } from "./controllers";

const router = Router();

router.get("/", authMMJWT, getImages);
router.get("/:id", authMMJWT, getImage);

router.post(
    "/",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        sanitizeString("name").notEmpty().withMessage("Name is required").isLength({ max: 32 }).withMessage("Name must be 32 characters or less"),
        body("base64").notEmpty().withMessage("Base64 is required"),
    ],
    handleValidation,
    createImage
);

router.put(
    "/:id",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        sanitizeString("name").optional().notEmpty().withMessage("Name cannot be empty").isLength({ max: 32 }).withMessage("Name must be 32 characters or less"),
        body("base64").optional().notEmpty().withMessage("Base64 cannot be empty"),
        body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
    ],
    handleValidation,
    updateImage
);

router.delete("/:id", authMMJWT, requireRole("admin", "encargado"), deleteImage);

export default router;
