import { Router } from "express";
import { verifyToken } from "../middlewares/checkLogin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { UserUploadedRecipes, addToWishlist, deleteUploadedRecipe, getAllRecipesOrderByWishlists, uploadRecipe } from "../controllers/recipe.controller.js";
const router = new Router();




//! protected routes
router.route("/upload").post(
    upload.single("coverImage"),
    verifyToken,
    uploadRecipe
)


router.route("/delete-recipe").delete(verifyToken, deleteUploadedRecipe);

router.route("/add-to-wishlist").post(verifyToken, addToWishlist);

router.route("/user-uploaded-recipes").post(verifyToken, UserUploadedRecipes);


//? fetch all the recipes

router.route("/sort-by-wishlists/:ascending").get(getAllRecipesOrderByWishlists);



export { router }