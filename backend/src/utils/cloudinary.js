import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
export const uploadToCloudinary = async (file) => {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        const res = await cloudinary.uploader.upload(file.path);

        fs.unlinkSync(file.path);
        return res;

    } catch (error) {
        fs.unlinkSync(file.path);
        return null;
    }
}