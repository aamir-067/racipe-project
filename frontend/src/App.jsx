import React from "react"
import { NavBar, Footer } from "./components/index.js"
import { Header, RecipeCard, ProfilePreview, EditProfile, Registration, Login, AllRecipes, EditRecipe, RecipePreview } from "./components/index"
import { Outlet } from "react-router-dom"
const App = () => {
    return (
        <div className="relative min-h-screen">
            <NavBar />
            {/* <AllRecipes /> */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default App