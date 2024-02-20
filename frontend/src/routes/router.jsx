import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App.jsx";
import { Registration, Login, RecipePreview } from "../components/index.js";
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="" element={<App />} />
            {/* <Route path="/dashboard" element={<h2>hello</h2>} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:recipeId/details" element={<Registration />} />
        </Route>
    )
);