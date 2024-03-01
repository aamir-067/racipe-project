import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetchedRecipesLength: 0,
    allFetchedRecipes: [],
    accessToken: "",
    appliedFilter: ""
}
const generalReducer = createSlice({
    name: "general",
    initialState,
    reducers: {
        getRecipesByFilter: (filter) => { }
    }
});


export default generalReducer.reducer;

export const { getRecipesByFilter } = generalReducer.actions;
