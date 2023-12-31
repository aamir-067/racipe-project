import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.model.js";
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


