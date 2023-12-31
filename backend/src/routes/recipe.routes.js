import { Router } from "express";
import { verifyToken } from "../middlewares/checkLogin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addToWishlist, uploadRecipe } from "../controllers/recipe.controller.js";
const router = new Router();




//! protected routes
router.route("/upload").post(
    upload.single("coverImage"),
    verifyToken,
    uploadRecipe
)

router.route("/add-to-wishlist").post(verifyToken, addToWishlist);



export { router }