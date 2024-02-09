import React from "react"
import { NavBar, Footer } from "./components/index.js"
import { Header, RecipeCard, ProfilePreview, EditProfile, Registration, Login, AllRecipes, EditRecipe, RecipePreview } from "./components/index"
import { Outlet } from "react-router-dom"
const App = () => {
    return (
        <>
            <NavBar />
            {/* <Header /> */}
            {/* < ProfilePreview /> */}
            {/* <EditProfile /> */}
            {/* <Registration /> */}
            {/* <Login /> */}
            <AllRecipes />
            <Outlet />
            {/* < EditRecipe /> */}
            {/* <RecipePreview /> */}
            {/* <Header /> */}
            {/* <RecipeCard /> */}
            <Footer />
        </>
    )
}

export default App