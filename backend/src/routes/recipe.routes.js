import { Router } from "express";
import { verifyToken } from "../middlewares/checkLogin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    UserUploadedRecipes,
    addToWishlist,
    deleteFromWishlist,
    deleteUploadedRecipe,
    editRecipeCoverImage,
    editRecipeDescription,
    editRecipeIngredients,
    editRecipeName,
    fetchRecipeDetails,
    getAllRecipesOrderByDate,
    getAllRecipesOrderByName,
    getAllRecipesOrderByWishlists,
    uploadRecipe
} from "../controllers/recipe.controller.js";
import { searchRecipe } from "../controllers/recipe.controller.js";
const router = new Router();




//! protected routes
router.route("/upload").post(
    upload.single("coverImage"),
    verifyToken,
    uploadRecipe
)


router.route("/delete-recipe").delete(verifyToken, deleteUploadedRecipe);

router.route("/add-to-wishlist").post(verifyToken, addToWishlist);

router.route("/remove-from-wishlist").post(verifyToken, deleteFromWishlist);

router.route("/user-uploaded-recipes").post(verifyToken, UserUploadedRecipes);




//? get recipe details by id
router.route("/preview/:recipeId").get(fetchRecipeDetails);

//? fetch all the recipes
router.route("/sort-by-wishlists/:order").get(getAllRecipesOrderByWishlists);
router.route("/sort-by-name/:order").get(getAllRecipesOrderByName);
router.route("/sort-by-date/:order").get(getAllRecipesOrderByDate);


// ? editing the recipe

router.route("/edit-recipe/:recipeId/name").patch(verifyToken, editRecipeName);
router.route("/edit-recipe/:recipeId/description").patch(verifyToken, editRecipeDescription);
router.route("/edit-recipe/:recipeId/ingredients").patch(verifyToken, editRecipeIngredients);

router.route("/edit-recipe/:recipeId/cover-image").patch(
    verifyToken,
    upload.single("coverImage"),
    editRecipeCoverImage);


//search recipe.
router.route("/search-recipe").post(searchRecipe);


export { router }