import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "../features/userAcc.reducer.js";
import generalReducer from "../features/general.reducer.js";
import searchResultReducer from "../features/searchResult.reducer.js";
const store = configureStore({
    reducer: {
        userAcc: userAccountReducer,
        general: generalReducer,
        searchResult: searchResultReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware({
        serializableCheck: false,
    })
});


export { store };