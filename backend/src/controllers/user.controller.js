import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

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

export const refreshAccessToken = asyncHandler(async (req, res) => {
    // get the loggedIn user.
    // regenerate the tokens 
    // send back the ne tokens.

    const { _id } = req.user;

    // regenerate tokens.
    const { accessToken, refreshToken } = await generateAccessTokens(_id);
    // get the user with latest refresh token.
    const user = await User.findById(_id).select("-password");

    // send the user details and tokens.
    return res.status(200)
        .json(
            new ApiResponse(200, "tokens refreshed",
                {
                    user,
                    refreshToken,
                    accessToken
                })
        )

});


// ? To edit the details of the user.

export const changeUserPassword = asyncHandler(async (req, res) => {
    // get the new password.
    // change the password 
    // send response

    const { newPassword, currentPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isCorrect = user.isPasswordCorrect(currentPassword);

    if (!isCorrect) {
        throw new ApiError(402, "Incorrect current password");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res.status(200)
        .json(
            new ApiResponse(200, "password changed successfully")
        )
});

export const changeUserFullName = asyncHandler(async (req, res) => {
    const { fullName } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id,
        {
            fullName
        },
        {
            new: true
        });

    if (!user) {
        throw new ApiError(502, "Error while updating fullName");
    }

    return res.status(200).json(
        new ApiResponse(200, "fullName changed successfully", { user })
    )
});


export const changeUserAvatar = asyncHandler(async (req, res) => {

    const avatarImage = req.file;
    if (!avatarImage) {
        throw new ApiError(401, "avatar not found");
    }

    const avatar = await uploadToCloudinary(avatarImage);

    if (!avatar) {
        throw new ApiError(402, "Error while uploading avatar");
    }

    await deleteFromCloudinary(req.user.avatar);

    const user = await User.findByIdAndUpdate(req.user._id,
        {
            avatar: avatar.url || ""
        },
        {
            new: true
        }
    );

    return res.status(200).json(
        new ApiResponse(200, "avatar updated successfully", { user })
    )
});


// ! danger
export const deleteUserAccount = asyncHandler(async (req, res) => {
    const { _id } = req?.user;

    if (!_id) {
        throw new ApiError(401, "Login First");
    }

    const userToDelete = await User.findById(_id);

    if (!userToDelete) {
        throw new ApiError(404, "User not found");
    }

    // delete all the recipes  he uploaded.
    // delete all its wishlists.

    await Recipe.deleteMany({
        owner: _id.toString()
    });

    await Wishlist.deleteMany({
        user: _id.toString()
    });

    // delete the account and reset the cookies.

    const deletedUser = await User.findByIdAndDelete(_id).select("-password -refreshToken");
    // delete the avatar image from cloudinary.
    await deleteFromCloudinary(deletedUser?.avatar || "");

    return res
        .status(200)
        .clearCookie("refreshToken", { httpOnly: true, secure: true })
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .json(
            new ApiResponse(200, "user account deleted successfully", { deletedUser })
        )
})

// name, email, avatar, uploadedRecipes, wishlists.
export const getUserAccountDetails = asyncHandler(async (req, res) => {
    const { username } = req.params;
    console.log(username);
    const account = await User.aggregate([
        {
            $match: {
                "username": username
            }
        }, {
            $lookup: {
                from: "recipes",
                foreignField: "owner",
                localField: "_id",
                as: "uploadedRecipes"
            }
        }, {
            $lookup: {
                from: "wishlists",
                foreignField: "user",
                localField: "_id",
                as: "wishlistRecipes"
            }
        }, {
            $lookup: {
                from: "recipes",
                localField: "wishlistRecipes.recipe",
                foreignField: "_id",
                as: "wishlistRecipes",
            }
        }, {
            $project: {
                uploadedRecipes: 1,
                wishlistRecipes: 1,
                fullName: 1,
                username: 1,
                email: 1,
                avatar: 1,
            }
        }
    ]);

    if (!account.length) {
        throw new ApiError(404, "account not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "account fetched", { account: account[0] })
    )
});

export const getUserWishlists = asyncHandler(async (req, res) => {
    // user must be logged in.
    const { _id } = req.user;

    const wishListed = await User.aggregate([
        {
            $match: {
                _id: _id
            }
        }, {
            $lookup: {
                from: "wishlists",
                localField: "_id",
                foreignField: "user",
                as: "allWishlists",
            }
        },
        {
            $lookup: {
                from: "recipes",
                localField: "allWishlists.recipe",
                foreignField: "_id",
                as: "wishListedRecipes",
            }
        },
        {
            $project: {
                wishListedRecipes: 1,
                _id: 0
            }
        }
    ]);

    console.log(wishListed);
    return res.status(200).json(
        new ApiResponse(200, "fetched successfully", { wishListedRecipes: wishListed[0].wishListedRecipes })
    )
});


// For searching the recipe.
export const searchRecipe = asyncHandler(async (req, res) => {
    // get the search value
    // break it in the array
    // search for each.
    // append the all Recipes 
    //
    let { search } = req.body;
    if (!search) {
        throw new ApiError(401, "search parameter is missing");
    }
    search = search.split(" ").map(item => item.trim());

    const searchResult = await Recipe.find({
        $or: [
            {
                name: { $in: [search.map(item => new RegExp(item, "i"))] }
            },
            {
                tags: { $in: [search.map(item => new RegExp(item, "i"))] }
            },
            {
                ingredients: { $in: [search.map(item => new RegExp(item, "i"))] }
            }
        ]
    });

    console.log(searchResult);

    return res.status(200).json(
        new ApiResponse(200, "search result fetched", { result: searchResult })
    )
})




