import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    tags: [
        {
            type: String,
            lowercase: true,
        }
    ],
    ingredients: [
        {
            type: String,
            trim: true,
        }
    ],
    coverImage: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    wishlistsCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export const Recipe = model("Recipe", RecipeSchema);