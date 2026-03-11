import { Router } from "express";
import { body } from "express-validator";
import { authJWT } from "../middlewares/authJWT";
import { handleValidation } from "../middlewares/handleValidation";
import { getMaps, getMap, createMap, updateMap, deleteMap } from "./controllers";

const router = Router();

router.use(authJWT);

router.get("/", getMaps);

router.get("/:id", getMap);

router.post("/",
    body("title").notEmpty().withMessage("title is required").isLength({ max: 100 }).withMessage("title must be max 100 characters"),
    body("nodes").optional().isArray().withMessage("nodes must be an array"),
    body("nodes.*.label").notEmpty().withMessage("node label is required").isLength({ max: 999 }).withMessage("node label must be max 999 characters"),
    body("nodes.*.description").optional().isLength({ max: 999 }).withMessage("node description must be max 999 characters"),
    body("nodes.*.type").notEmpty().withMessage("node type is required").isLength({ max: 999 }).withMessage("node type must be max 999 characters"),
    body("nodes.*.children").optional().isArray().withMessage("node children must be an array")
        .custom((arr: unknown[]) => arr.every((id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id)))
        .withMessage("each child must be a valid MongoDB id"),
    handleValidation,
    createMap
);

router.put("/:id",
    body("title").optional().isLength({ min: 1, max: 100 }).withMessage("title must be max 100 characters"),
    body("nodes").optional().isArray().withMessage("nodes must be an array"),
    body("nodes.*.label").notEmpty().withMessage("node label is required").isLength({ max: 999 }).withMessage("node label must be max 999 characters"),
    body("nodes.*.description").optional().isLength({ max: 999 }).withMessage("node description must be max 999 characters"),
    body("nodes.*.type").notEmpty().withMessage("node type is required").isLength({ max: 999 }).withMessage("node type must be max 999 characters"),
    body("nodes.*.children").optional().isArray().withMessage("node children must be an array")
        .custom((arr: unknown[]) => arr.every((id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id)))
        .withMessage("each child must be a valid MongoDB id"),
    handleValidation,
    updateMap
);

router.delete("/:id", deleteMap);

export default router;
