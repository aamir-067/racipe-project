import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiResponse } from "./utils/ApiResponse.js";


const app = express();

app.use(express.json({ limit: "200kb" })); // to get the data and params from the body like json.
app.use(express.urlencoded({ limit: "200kb", extended: true }));  // to get the data and params from the url

app.use(express.static('public'));   // to handle file in public folder


app.use(cors({
    whitelist: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(cookieParser());


app.get('/', (req, res) => {
    res.status(200)
        .json(new ApiResponse(200, "OK"));
})

import { router as userRouter } from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);


import { router as recipeRouter } from "./routes/recipe.routes.js";
app.use("/api/v1/recipes", recipeRouter);

export { app };