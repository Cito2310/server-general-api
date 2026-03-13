export const isMongoError = (error: unknown): error is { code: number } =>
    typeof error === "object" && error !== null && "code" in error;
