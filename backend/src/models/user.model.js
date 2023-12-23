import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        unique: true,
        required: [true, "password is must"]
    },
    avatar: {
        type: String,
        default: "",
    },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    refreshToken: {
        type: String
    }

}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 15);
        next();
    } else {
        return next();
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    const accessToken = await jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        })
    return accessToken
}
userSchema.methods.generateRefreshToken = async function () {
    const refreshToken = await jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "20d"
        })
    return refreshToken;
}



export const User = mongoose.model('User', UserSchema);


