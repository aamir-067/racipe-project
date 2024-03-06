import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import mongoose from "mongoose";


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

});

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
    const isWishListed = await Wishlist.findOne({
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

export const deleteFromWishlist = asyncHandler(async (req, res) => {
    // see if online.
    // check if the wishlist is available
    // check if the wishlist is done by the client
    // delete the wishlist from the wishlists
    // send response

    const { _id } = req.user;
    const { recipeId } = req.body;

    const deletedWishlist = await Wishlist.findOneAndDelete({
        $and: [{ user: _id }, { recipe: new mongoose.Types.ObjectId(recipeId) }]
    });

    await Recipe.findByIdAndUpdate(recipeId, {
        $inc: {
            wishlistsCount: -1
        }
    })

    if (!deletedWishlist) {
        throw new ApiError(404, "recipe not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "wishlist removed successfully", { deletedWishlist })
    )
})


export const deleteUploadedRecipe = asyncHandler(async (req, res) => {
    const { _id } = req?.user;
    const { recipeId } = req.body;

    if (!recipeId) {
        throw new Error("Invalid Recipe ID");
    }

    if (!_id) {
        throw new ApiError(401, "User is not logged in");
    }
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(401, "Recipe not found");
    }

    if (recipe?.owner.toString() !== _id.toString()) {
        throw new ApiError(401, "you are not the recipe owner");
    }


    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    return res.status(200).json(
        new ApiResponse(200, "Recipe deleted successfully", { deletedRecipe })
    );

});


export const UserUploadedRecipes = asyncHandler(async (req, res) => {
    const { _id } = req?.user?._id;

    if (!_id) {
        throw new ApiError(401, "User is not logged in");
    }

    const allRecipes = await Recipe.find({
        owner: _id
    });

    return res.status(200).json(
        new ApiResponse(200, "recipes fetched successfully", { allRecipes })
    )
});


export const getAllRecipesOrderByWishlists = asyncHandler(async (req, res) => {
    // get the asc , desc flag.
    // get all the recipes.
    // sort it by wishlists count. 
    // set the ascending ad descending flag accordingly.
    // return the result.

    const { order } = req?.params;
    let asc;
    if (order === "ascending") {
        asc = 1;
    } else if (order === "descending") {
        asc = -1;
    } else {
        throw new ApiError(403, "Route not found");
    }


    const allRecipes = await Recipe.aggregate([{
        $sort: {
            "wishlistsCount": asc
        }
    }]);


    return res.status(200).json(
        new ApiResponse(200, "recipes fetched successfully", { allRecipes })
    )
});

export const getAllRecipesOrderByName = asyncHandler(async (req, res) => {
    const { order } = req?.params;
    let asc;
    if (order === "ascending") {
        asc = 1;
    } else if (order === "descending") {
        asc = -1;
    } else {
        throw new ApiError(403, "Route not found");
    }


    const allRecipes = await Recipe.aggregate([{
        $sort: {
            "name": asc
        }
    }]);


    return res.status(200).json(
        new ApiResponse(200, "recipes fetched successfully", { allRecipes })
    )
});


export const getAllRecipesOrderByDate = asyncHandler(async (req, res) => {


    const { order } = req?.params;
    let asc;
    if (order === "ascending") {
        asc = 1;
    } else if (order === "descending") {
        asc = -1;
    } else {
        throw new ApiError(403, "Route not found");
    }

    const allRecipes = await Recipe.aggregate([{
        $sort: {
            "createdAt": asc
        }
    }]);


    return res.status(200).json(
        new ApiResponse(200, "recipes fetched successfully", { allRecipes })
    )
});


//? get recipe details.

export const fetchRecipeDetails = asyncHandler(async (req, res) => {

    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(404, "recipe not found");
    }


    return res.status(200).json(
        new ApiResponse(200, "recipe details fetched successfully", { recipe })
    );
})

// ? editing the recipe.

export const editRecipeName = asyncHandler(async (req, res) => {
    const { recipeId } = req.params;
    const { name } = req.body;
    if (!(name && recipeId)) {
        throw new ApiError(401, "name not found");
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new ApiError(401, "recipe not found");
    }

    // check if the person is the owner of the recipe
    const owner = req.user?._id;
    if (recipe.owner.toString() !== owner.toString()) {
        throw new ApiError(401, "Un Authorized request");
    }

    const newRecipe = await Recipe.findByIdAndUpdate(recipeId,
        {
            name
        },
        {
            new: true
        }
    );

    return res.status(200).json(
        new ApiResponse(200, "recipe name updated successfully", { newRecipe })
    )
});

export const editRecipeCoverImage = asyncHandler(async (req, res) => {
    const coverImage = req.file;
    const { recipeId } = req.params;

    if (!(coverImage && recipeId)) {
        throw new ApiError(401, "coverImage not found");
    }

    // get the recipe,
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(401, "recipe not found");
    }

    // check if the person is the owner.
    const owner = req.user?._id;
    if (recipe.owner.toString() !== owner.toString()) {
        throw new ApiError(401, "Un Authorized request");
    }



    // upload the new to cloudinary.
    const uploadedCoverImage = await uploadToCloudinary(coverImage);

    if (!uploadedCoverImage) {
        throw new ApiError(402, "error while uploading cover image");
    }

    // delete the prev image.
    await deleteFromCloudinary(recipe.coverImage);


    // update the new image.

    const newRecipe = await Recipe.findByIdAndUpdate(recipeId,
        {
            coverImage: uploadedCoverImage.url
        },
        {
            new: true
        }
    );
    // send the response
    return res.status(200).json(
        new ApiResponse(200, "recipe coverImage updated successfully", { newRecipe })
    )
});

export const editRecipeDescription = asyncHandler(async (req, res) => {
    const { recipeId } = req.params;
    const { description } = req.body;
    if (!(recipeId && description)) {
        throw new ApiError(401, "recipe id or description is missing");
    }
    // check if the caller is owner and the recipe is available.

    const recipe = await Recipe.findById(recipeId);
    if (!(recipe && (recipe.owner.toString() === req.user._id.toString()))) {
        throw new ApiError(404, "unauthorized request recipe not found");
    }

    // update the description and send the response.
    recipe.description = description;
    await recipe.save();

    return res.status(200).json(
        new ApiResponse(200, "description updated successfully")
    );
})
export const editRecipeIngredients = asyncHandler(async (req, res) => {
    const { recipeId } = req.params;
    let { ingredients } = req.body;

    if (!(recipeId && ingredients)) {
        throw new ApiError(401, "recipe id or ingredients is missing");
    }

    ingredients = ingredients.split(",").map(item => item.trim());

    // check if the caller is owner and the recipe is available.

    const recipe = await Recipe.findById(recipeId);
    if (!(recipe && (recipe.owner.toString() === req.user._id.toString()))) {
        throw new ApiError(404, "unauthorized request recipe not found");
    }

    // update the ingredients and send the response.
    recipe.ingredients = ingredients;
    await recipe.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, "recipe ingredients updated successfully")
    );
})


// For searching the recipe.
export const searchRecipe = asyncHandler(async (req, res) => {
    // get the search value
    // break it in the array
    // search for each.
    // append the all Recipes 
    //

    let { search, asc, filter } = req.body;

    // in there must be one filter applied if not then result will be based on popularity.
    if (!(["wishlistsCount", "name", "createdAt"].some(item => item === filter?.trim()))) {
        throw new ApiError(401, "invalid filter applied");
    }

    if (!([search, filter, asc].every(item => item ? true : false))) {
        throw new ApiError(401, "search parameter is missing");
    }

    search = search.split(" ").map(item => item.trim());
    const searchResult = await Recipe.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: new RegExp(`${search.join("|")}`, "i") }
                    },
                    {
                        tags: { $in: [...search, ...search.map(item => item.toUpperCase()), ...search.map(item => item.toLowerCase())] }
                    },
                    {
                        ingredients: { $in: [...search, ...search.map(item => item.toUpperCase()), ...search.map(item => item.toLowerCase())] }
                    }
                ]
            }
        },
        {
            $sort: {
                [filter]: asc == "yes" ? 1 : -1
            }
        }
    ]);
    return res.status(200).json(
        new ApiResponse(200, "search result fetched", searchResult)
    )
})