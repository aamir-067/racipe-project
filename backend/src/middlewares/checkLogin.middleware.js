import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyToken = asyncHandler(async (req, res, next) => {


    try {

        // get the token
        // verify it
        // if its correct then fetch the user
        // send the user to req.user
        // execute the next 


        const refreshToken = req?.cookies?.refreshToken ||
            req?.headers?.authorization.replace("Bearer ", "");

        if (!refreshToken) {
            throw new ApiError(400, "Please login first.");
        }


        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userId = payload?._id;
        if (!userId) {
            throw new ApiError(400, "Undefined refreshToken");
        }

        const user = await User.findById(userId).select("-password");

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(401, "user is not loggedIn. try again", [error?.massage])
    }
});