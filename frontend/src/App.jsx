import React, { useEffect } from "react"
import { NavBar, Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"
import { getRefreshToken } from "./utils/getRefreshToken.js"
import { store } from "./app/store.js"
import { updateData } from "./features/userAcc.reducer.js"
import Cookies from "js-cookie"

const App = () => {

    useEffect(() => {
        const refreshToken = getRefreshToken();
        const { userAcc } = store.getState();
        const user = Cookies.get("user");
        if (!refreshToken) {
            store.dispatch(updateData({
                ...userAcc,
                isLogin: false,
            }));
        } else {
            store.dispatch(updateData({
                ...userAcc,
                isLogin: true,
                accDetails: {
                    ...userAcc.accDetails,
                    username: user
                }
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