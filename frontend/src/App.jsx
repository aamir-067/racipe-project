import React from "react"
import { NavBar, Footer } from "./components/index.js"
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