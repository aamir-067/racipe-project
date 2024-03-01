import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    searchResult: [],
    filter: "",
}
const searchResultReducer = createSlice({
    name: "searchResult",
    initialState,
    reducers: {
        getSearchResult: () => { }
    }
});

export default searchResultReducer.reducer;
export const { getSearchResult } = searchResultReducer.actions;
