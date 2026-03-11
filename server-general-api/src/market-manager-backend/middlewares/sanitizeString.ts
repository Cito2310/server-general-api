import { body } from "express-validator";

export const sanitizeString = (field: string) =>
    body(field).trim().customSanitizer((v: string) => v.replace(/\s+/g, " "));
