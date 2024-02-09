import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App.jsx";
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="" element={<App />} />
            <Route path="/dashboard" element={<h2>hello</h2>} />
        </Route>
    )
);