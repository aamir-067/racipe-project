import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);

    return res.status(200)
        .json({
            status: 200,
            massage: "hello world"
        })
});