import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { logOutUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/checkLogin.middleware.js";


const router = new Router();


router.route("/register").post(
    upload.single("avatar"),
    registerUser);

router.route("/login").post(loginUser);

// protected routes

router.route("/logout").post(verifyToken, logOutUser);

export { router };