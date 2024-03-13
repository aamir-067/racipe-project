import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App.jsx";
import { Registration, Header, Login, Error, RecipePreview, ProfilePreview, UploadRecipe, EditProfile, EditRecipe, AllRecipes } from "../components/index.js";
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>

            <Route path="" element={<Header />} />
            <Route path="/user/:username">
                <Route path="" element={<ProfilePreview />} />
                <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/search/:searchQuery/result" element={<AllRecipes />} />
            <Route path="/recipe/:recipeId/preview" element={<RecipePreview />} />
            <Route path="/recipe/:recipeId/edit" element={<EditRecipe />} />
            <Route path="/recipe/new/upload" element={<UploadRecipe />} />
            <Route path="*" element={<Error />} />
        </Route>
    )
);