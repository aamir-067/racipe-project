import { Schema, model, Types } from "mongoose";


const WishlistSchema = new Schema({
    recipe: {
        type: Types.ObjectId,
        ref: "Recipe"
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Wishlist = model("Wishlist", WishlistSchema);
