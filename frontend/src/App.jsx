import React, { useEffect } from "react"
import { NavBar, Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"
import { getRefreshToken } from "./utils/getRefreshToken.js"
import { store } from "./app/store.js"
import { updateData } from "./features/userAcc.reducer.js"

const App = () => {

    useEffect(() => {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            store.dispatch(updateData({
                isLogin: false,
            }));
        } else {
            store.dispatch(updateData({
                isLogin: true,
            }));
        }

    })
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