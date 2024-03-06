import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { changeUserAvatar, changeUserFullName, changeUserPassword, deleteUserAccount, getUserAccountDetails, getUserWishlists, logOutUser, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/checkLogin.middleware.js";


const router = new Router();


router.route("/register").post(
    upload.single("avatar"),
    registerUser);

router.route("/login").post(loginUser);



// ? get user account
router.route("/p/:username").get(getUserAccountDetails);

// protected routes

router.route("/logout").post(verifyToken, logOutUser);
router.route("/refresh-tokens").post(verifyToken, refreshAccessToken);

// ? to update the user details.
router.route("/change-fullName").post(verifyToken, changeUserFullName);
router.route("/change-password").post(verifyToken, changeUserPassword);
router.route("/change-avatar").post(verifyToken, upload.single("avatar"), changeUserAvatar);


router.route("/:username/wishlists").get(verifyToken, getUserWishlists);


// ! danger zone
router.route("/delete-account").delete(verifyToken, deleteUserAccount);

export { router };