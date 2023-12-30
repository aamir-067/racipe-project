import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
export const registerUser = asyncHandler(async (req, res) => {

    const { fullName, username, email, password } = req.body;
    console.log(req.body);

    // if the required field is not given.
    const isEmpty = [username, email, fullName, password].some((item) => {
        return item?.trim() === '';
    })
    if (isEmpty) {
        throw new ApiError(400, "user must enter a correct fields");
    }

    // check if the user already exists
    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (existedUser) {
        throw new ApiError(409, "user already exists");
    }

    // get and post the avatar.
    const avatarImage = req?.file;

    if (!avatarImage) {
        throw new ApiError(401, "avatar image is missing");
    }

    const avatar = await uploadToCloudinary(avatarImage);

    if (!avatar) {
        throw new ApiError(400, "Avatar is not uploaded to cloudinary try again");
    }

    // create a new user.
    const user = await User.create({
        username,
        email,
        password,
        fullName,
        avatar: avatar.url
    })

    const newUser = await User.findById(user._id).select("-password -refreshToken");

    if (!newUser) {
        throw new ApiError(500, "Something bad happened while creating a new user");
    }

    return res.status(200).json(
        new ApiResponse(200, "user created successfully", newUser)
    );

});