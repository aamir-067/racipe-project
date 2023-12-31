import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.model.js";
import { Wishlist } from "../models/wishlist.model.js";


export const uploadRecipe = asyncHandler(async (req, res) => {

    let { name,
        description,
        tags,
        ingredients
    } = req.body;

    if ([name, description, ingredients].some(x => x === "")) {
        throw new ApiError(401, "Required fields are missing");
    }

    ingredients = ingredients.split(",");
    ingredients = ingredients.map(item => item.trim());

    tags = tags.split(",");
    tags = tags.map(t => t.trim())

    if (ingredients.length <= 0) {
        throw new ApiError(401, "Required fields are missing");
    }

    const coverImage = req.file;
    if (!coverImage) {
        throw new ApiError(401, "recipe cover Image is missing");
    }

    const cover = await uploadToCloudinary(coverImage);

    if (!cover) {
        throw new ApiError(402, "something went wrong while uploading coverImage");
    }

    const recipe = await Recipe.create({
        name,
        description,
        tags: tags.length > 0 ? tags : [],
        ingredients,
        coverImage: cover.url,
        owner: req.user._id
    });


    return res.status(200)
        .json(
            new ApiResponse(200, "recipe uploaded successfully", { recipe })
        );

})

export const addToWishlist = asyncHandler(async (req, res) => {
    // user must be logged in.
    // check whether its already in the wishlist or not.
    // get the recipe on which he clicks.
    // increment the the wishlist count.
    // make another Document of wishlist
    // send the response.
    const { recipeId } = req.body;

    if (!recipeId) {
        throw new ApiError(401, "provide Recipe id");
    }

    let recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(402, "invalid Recipe id");
    }


    // check if its already in wishlist or not.
    const isWishListed = await Wishlist.find({
        $and: [{ user: req.user._id }, { recipe: recipe._id }]
    })

    if (isWishListed) {
        throw new ApiError(400, "item is already in wishlist");
    }


    recipe = await Recipe.findByIdAndUpdate(recipeId, {
        wishlistsCount: recipe.wishlistsCount + 1
    }, { new: true });

    const newWishlist = await Wishlist.create({
        recipe: recipeId,
        user: req.user._id
    });

    if (!newWishlist) {
        new ApiError(500, "something went wrong while creating new Wishlist");
    }

    return res.status(200)
        .json(
            new ApiResponse(200, "successfully added to wishlist", { newWishlist })
        )

});


