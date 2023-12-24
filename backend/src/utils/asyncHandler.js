import { ApiError } from "./ApiError.js";
export const asyncHandler = async (fn) => {
    try {
        return await fn(req, res, next);

    } catch (error) {
        throw new ApiError(
            500,
            error?.massage || "Something went wrong",
            error.errors || []
        );
    }
}