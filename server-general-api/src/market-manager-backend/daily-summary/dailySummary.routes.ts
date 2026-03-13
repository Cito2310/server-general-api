import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { authMMJWT } from "../middlewares/authMMJWT";
import { sanitizeString } from "../middlewares/sanitizeString";
import { getDailySummary, createDailySummary } from "./controllers";

const router = Router();

router.get("/", authMMJWT, getDailySummary);

router.post(
    "/",
    authMMJWT,
    [
        sanitizeString("date").notEmpty().withMessage("date is required").isISO8601({ strict: true }).withMessage("date must be a valid date in format YYYY-MM-DD"),

        body("totalTickets").notEmpty().withMessage("totalTickets is required").isNumeric().withMessage("totalTickets must be a number").isFloat({ min: 0 }).withMessage("totalTickets must be 0 or greater"),
        body("totalAmount").notEmpty().withMessage("totalAmount is required").isNumeric().withMessage("totalAmount must be a number").isFloat({ min: 0 }).withMessage("totalAmount must be 0 or greater"),

        body("morning.totalTickets").optional().isNumeric().withMessage("morning.totalTickets must be a number").isFloat({ min: 0 }).withMessage("morning.totalTickets must be 0 or greater"),
        body("morning.totalAmount").optional().isNumeric().withMessage("morning.totalAmount must be a number").isFloat({ min: 0 }).withMessage("morning.totalAmount must be 0 or greater"),

        body("night.totalTickets").optional().isNumeric().withMessage("night.totalTickets must be a number").isFloat({ min: 0 }).withMessage("night.totalTickets must be 0 or greater"),
        body("night.totalAmount").optional().isNumeric().withMessage("night.totalAmount must be a number").isFloat({ min: 0 }).withMessage("night.totalAmount must be 0 or greater"),

        body("products").optional().isArray().withMessage("products must be an array"),
        body("products.*.productId").notEmpty().withMessage("productId is required").isMongoId().withMessage("productId must be a valid id"),
        sanitizeString("products.*.name").notEmpty().withMessage("product name is required").isLength({ max: 64 }).withMessage("product name must be 64 characters or less"),
        body("products.*.quantitySold").notEmpty().withMessage("quantitySold is required").isNumeric().withMessage("quantitySold must be a number").isFloat({ min: 0 }).withMessage("quantitySold must be 0 or greater"),
        body("products.*.totalAmount").notEmpty().withMessage("product totalAmount is required").isNumeric().withMessage("product totalAmount must be a number").isFloat({ min: 0 }).withMessage("product totalAmount must be 0 or greater"),
    ],
    handleValidation,
    createDailySummary
);

export default router;
