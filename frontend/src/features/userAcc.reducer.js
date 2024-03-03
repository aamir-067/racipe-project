import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLogin: false,
    accDetails: null,
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
        updateData: (state, action) => {
            state.accDetails = action.payload.accDetails;
            state.wishListedRecipes = action.payload.wishListedRecipes;
            state.uploadedRecipes = action.payload.uploadedRecipes;
            state.isLogin = action.payload.isLogin;
        }
    }
});


export default userAcc.reducer;

export const { checkIsLogIn, getAccessToken, getUploadedRecipes, updateData, getWishListedRecipes } = userAcc.actions;
