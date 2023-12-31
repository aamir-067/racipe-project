import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const generateAccessTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // save the refresh token in the db.
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };
    } catch (error) {
        return null;
    }
}


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

    // get and post the avatar. its optional
    const avatarImage = req?.file;
    let avatar;
    if (avatarImage) {
        avatar = await uploadToCloudinary(avatarImage);
    }

    // create a new user.
    const user = await User.create({
        username,
        email,
        password,
        fullName,
        avatar: avatar.url || ""
    })

    const newUser = await User.findById(user._id).select("-password -refreshToken");

    if (!newUser) {
        throw new ApiError(500, "Something bad happened while creating a new user");
    }

    return res.status(200).json(
        new ApiResponse(200, "user created successfully", newUser)
    );

});


export const loginUser = asyncHandler(async (req, res) => {

    const {
        email,
        username,
        password
    } = req.body;

    if (!(email || username)) {
        throw new ApiError(201, "must enter either email or username");
    }

    // get the user
    let user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(402, "incorrect credentials sent by the user");
    }

    // check the password if its correct

    const isCorrect = await user.isPasswordCorrect(password);
    if (!isCorrect) {
        throw new ApiError(402, "incorrect credentials sent by the user");
    }


    // generate the tokens.
    const {
        accessToken,
        refreshToken
    } = await generateAccessTokens(user._id);


    // send the response
    // save the tokens in cookies.
    user = await User.findOne(user._id).select("-password -refreshToken");

    return res.status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json(
            new ApiResponse(200, "user logged in successfully", {
                user,
                refreshToken,
                accessToken
            })
        );
});


export const logOutUser = asyncHandler(async (req, res) => {

    const { _id } = req?.user;

    const user = await User.findByIdAndUpdate(_id, {
        refreshToken: ""
    }, { new: true }).select("-password -refreshToken");

    return res.status(200)
        .clearCookie("refreshToken", { httpOnly: true, secure: true })
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .json(
            new ApiResponse(200, "user Logged out", { user })
        );
})