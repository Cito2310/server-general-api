import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../../middlewares/handleValidation";
import { authMMJWT } from "../middlewares/authMMJWT";
import { requireRole } from "../middlewares/requireRole";
import { sanitizeString } from "../middlewares/sanitizeString";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers";

const router = Router();

const SIZE_TYPES = ["kg", "g", "oz", "cm3", "l", "ml", "u", "cc"];
const UNIT_TYPES = ["unit", "weight"];

router.get("/", authMMJWT, getProducts);
router.get("/:id", authMMJWT, getProduct);

router.post(
    "/",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        // info
        sanitizeString("info.name").notEmpty().withMessage("info.name is required").isLength({ max: 64 }).withMessage("info.name must be 64 characters or less"),
        sanitizeString("info.category").notEmpty().withMessage("info.category is required").isLength({ max: 32 }).withMessage("info.category must be 32 characters or less"),
        sanitizeString("info.subcategory").notEmpty().withMessage("info.subcategory is required").isLength({ max: 32 }).withMessage("info.subcategory must be 32 characters or less"),
        sanitizeString("info.brand").notEmpty().withMessage("info.brand is required").isLength({ max: 32 }).withMessage("info.brand must be 32 characters or less"),
        sanitizeString("info.barcode").notEmpty().withMessage("info.barcode is required").isLength({ max: 32 }).withMessage("info.barcode must be 32 characters or less"),
        sanitizeString("info.primary").notEmpty().withMessage("info.primary is required").isLength({ max: 32 }).withMessage("info.primary must be 32 characters or less"),
        body("info.size").notEmpty().withMessage("info.size is required").isNumeric().withMessage("info.size must be a number"),
        body("info.sizeType").notEmpty().withMessage("info.sizeType is required").isIn(SIZE_TYPES).withMessage(`info.sizeType must be one of: ${SIZE_TYPES.join(", ")}`),
        body("info.price").notEmpty().withMessage("info.price is required").isNumeric().withMessage("info.price must be a number"),
        body("info.unitType").notEmpty().withMessage("info.unitType is required").isIn(UNIT_TYPES).withMessage(`info.unitType must be one of: ${UNIT_TYPES.join(", ")}`),

        // options
        body("options.hasExpirationControl").optional().isBoolean().withMessage("options.hasExpirationControl must be a boolean"),
        body("options.hasStockControl").optional().isBoolean().withMessage("options.hasStockControl must be a boolean"),

        // stock
        body("stock.currentStock").optional().isNumeric().withMessage("stock.currentStock must be a number").isFloat({ min: 0 }).withMessage("stock.currentStock must be 0 or greater"),
        body("stock.mediumStockAlert").optional().isNumeric().withMessage("stock.mediumStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.mediumStockAlert must be 0 or greater"),
        body("stock.lowStockAlert").optional().isNumeric().withMessage("stock.lowStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.lowStockAlert must be 0 or greater"),
        body("stock.veryLowStockAlert").optional().isNumeric().withMessage("stock.veryLowStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.veryLowStockAlert must be 0 or greater"),

        // expiration
        body("expiration.alertExpiration").optional().isNumeric().withMessage("expiration.alertExpiration must be a number").isFloat({ min: 0 }).withMessage("expiration.alertExpiration must be 0 or greater"),
        body("expiration.batches").optional().isArray().withMessage("expiration.batches must be an array"),
        sanitizeString("expiration.batches.*.expirationDate").optional().notEmpty().withMessage("expirationDate cannot be empty").isLength({ max: 32 }).withMessage("expirationDate must be 32 characters or less"),
        body("expiration.batches.*.quantity").optional().isNumeric().withMessage("batch quantity must be a number").isFloat({ min: 0 }).withMessage("batch quantity must be 0 or greater"),
    ],
    handleValidation,
    createProduct
);

router.put(
    "/:id",
    authMMJWT,
    requireRole("admin", "encargado"),
    [
        // info
        sanitizeString("info.name").optional().notEmpty().withMessage("info.name cannot be empty").isLength({ max: 64 }).withMessage("info.name must be 64 characters or less"),
        sanitizeString("info.category").optional().notEmpty().withMessage("info.category cannot be empty").isLength({ max: 32 }).withMessage("info.category must be 32 characters or less"),
        sanitizeString("info.subcategory").optional().notEmpty().withMessage("info.subcategory cannot be empty").isLength({ max: 32 }).withMessage("info.subcategory must be 32 characters or less"),
        sanitizeString("info.brand").optional().notEmpty().withMessage("info.brand cannot be empty").isLength({ max: 32 }).withMessage("info.brand must be 32 characters or less"),
        sanitizeString("info.barcode").optional().notEmpty().withMessage("info.barcode cannot be empty").isLength({ max: 32 }).withMessage("info.barcode must be 32 characters or less"),
        sanitizeString("info.primary").optional().notEmpty().withMessage("info.primary cannot be empty").isLength({ max: 32 }).withMessage("info.primary must be 32 characters or less"),
        body("info.size").optional().isNumeric().withMessage("info.size must be a number"),
        body("info.sizeType").optional().isIn(SIZE_TYPES).withMessage(`info.sizeType must be one of: ${SIZE_TYPES.join(", ")}`),
        body("info.price").optional().isNumeric().withMessage("info.price must be a number"),
        body("info.unitType").optional().isIn(UNIT_TYPES).withMessage(`info.unitType must be one of: ${UNIT_TYPES.join(", ")}`),

        // options
        body("options.hasExpirationControl").optional().isBoolean().withMessage("options.hasExpirationControl must be a boolean"),
        body("options.hasStockControl").optional().isBoolean().withMessage("options.hasStockControl must be a boolean"),
        body("options.isActive").optional().isBoolean().withMessage("options.isActive must be a boolean"),

        // stock
        body("stock.currentStock").optional().isNumeric().withMessage("stock.currentStock must be a number").isFloat({ min: 0 }).withMessage("stock.currentStock must be 0 or greater"),
        body("stock.mediumStockAlert").optional().isNumeric().withMessage("stock.mediumStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.mediumStockAlert must be 0 or greater"),
        body("stock.lowStockAlert").optional().isNumeric().withMessage("stock.lowStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.lowStockAlert must be 0 or greater"),
        body("stock.veryLowStockAlert").optional().isNumeric().withMessage("stock.veryLowStockAlert must be a number").isFloat({ min: 0 }).withMessage("stock.veryLowStockAlert must be 0 or greater"),

        // expiration
        body("expiration.alertExpiration").optional().isNumeric().withMessage("expiration.alertExpiration must be a number").isFloat({ min: 0 }).withMessage("expiration.alertExpiration must be 0 or greater"),
        body("expiration.batches").optional().isArray().withMessage("expiration.batches must be an array"),
        sanitizeString("expiration.batches.*.expirationDate").optional().notEmpty().withMessage("expirationDate cannot be empty").isLength({ max: 32 }).withMessage("expirationDate must be 32 characters or less"),
        body("expiration.batches.*.quantity").optional().isNumeric().withMessage("batch quantity must be a number").isFloat({ min: 0 }).withMessage("batch quantity must be 0 or greater"),
    ],
    handleValidation,
    updateProduct
);

router.delete("/:id", authMMJWT, requireRole("admin", "encargado"), deleteProduct);

export default router;
