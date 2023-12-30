import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";


const router = new Router();


router.route("/register").post(
    upload.single("avatar"),
    registerUser);


export { router };