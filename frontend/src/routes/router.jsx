import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App.jsx";
import { Registration, Header, Login, RecipePreview, ProfilePreview, EditProfile } from "../components/index.js";
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
            <Route path="/:recipeId/details" element={<RecipePreview />} />
        </Route>
    )
);