import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
export const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(process.env.MONGODB_URI + `/${DB_NAME}`);
        console.log("db connected to : ", dbInstance.connection.host);
    } catch (error) {
        throw new ApiError(500, error.massage || "Something went wrong while connecting to DB");
    }
}