import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLogin: false,
    accessToken: "",
    wishListedRecipes: [],
    uploadedRecipes: [],
}
const userAcc = createSlice({
    name: "userAcc",
    initialState,
    reducers: {
        checkIsLogIn: () => { },
        getAccessToken: () => { },
        getUploadedRecipes: () => { },
        getWishListedRecipes: () => { },
    }
});


export default userAcc.reducer;

export const { checkIsLogIn, getAccessToken, getUploadedRecipes, getWishListedRecipes } = userAcc.actions;
