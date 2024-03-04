import React, { useEffect, useRef, useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from "react-router-dom";
import searchIcon from "../../assets/search.png";
import { useNavigate } from 'react-router-dom';
import { store } from '../../app/store';
import { getRefreshToken } from "../../utils/getRefreshToken";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import Cookies from 'js-cookie';
import { updateData } from '../../features/userAcc.reducer';

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("");


    const handleRef = () => {
        let value = searchRef.current?.value;
        value && navigate(`/search/${value}/result`);
    }


    const handleLogout = async () => {
        // make sure it logged in already.
        // get the refreshToken from localStorage and sent it in headers.
        // wait for response
        // clear the localStorage.
        const refreshToken = getRefreshToken();
        console.log("refresh Token :", refreshToken);
        if (!refreshToken) {
            // user in not logged in
            // TODO : Give client an error message.
            return;
        }
        setOpenMenu(false);

        let response;
        try {
            response = await axios.post(serverApi + "users/logout", undefined, {
                headers: {
                    "authorization": "Bearer " + refreshToken
                }
            });

            if (!response.data.success) {
                // error 
                return;
            };

            // clear the localStorage.
            // clear the cookies.
            Cookies.remove("refreshToken");
            localStorage.clear();

            // reset the state.
            store.dispatch(updateData({
                isLogin: false,
                accDetails: {
                    username: "",
                    email: "",
                    fullName: "",
                    avatar: "",
                },
                wishListedRecipes: [],
                uploadedRecipes: [],
            }))

            // navigate to the login page.
            navigate("/login");

        } catch (error) {
            console.log(error);
            // TODO : Give client an error message;
        }
    }


    const { userAcc: { isLogin } } = store.getState(state => state);
    useEffect(() => {
        isLogin ? setIsLoggedIn(true) : setIsLoggedIn(false);
        let username = store.getState(prev => prev)?.userAcc?.accDetails?.username;
        setUser(username ? username : "");
    }, [isLogin]);
    return (
        <>
            <nav className='flex px-8 justify-between items-center w-full h-16 bg-black text-white relative z-10'>
                <NavLink to={"/"} onClick={() => setOpenMenu(false)} className=' w-1/3 md:w-1/3 p-2'>
                    <div >
                        <h1 className='hidden lg:block font-bolder md:text-2xl text-lg lg:text-3xl'>Aamfeer Kitchen</h1>
                        <h1 className='font-myBold8 text-5xl lg:hidden'>AK</h1>
                    </div>
                </NavLink>

                <form className='p-2 pl-4 outline-black rounded text-black bg-white flex items-center justify-between lg:w-6/12 md:w-full md:mx-6'>
                    <input
                        type='search'
                        ref={searchRef}
                        placeholder='Search for recipe ...'
                        className='outline-none rounded text-black mx-1 my-0'
                    />
                    <button onClick={handleRef} className='w-8'><img src={searchIcon} /></button>
                </form>

                <div className='w-full lg:w-1/3 relative -mt-14'>
                    <button
                        className='p-2 text-3xl bg-slate-900 z-20 rounded absolute right-4 top-1 transition'
                        onClick={() => setOpenMenu(prev => !prev)}
                    >
                        {openMenu ? <RxCross2 /> : <RiMenu3Line />}
                    </button>
                    {openMenu && (
                        <div className='w-full absolute right-0 -mt-4 top-16 z-10 bg-black transition-opacity'>
                            <ul className='flex flex-col w-full mt-4'>
                                <NavLink className={`${isLoggedIn ? "block" : "hidden"}`} to={`/user/${user}`} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        My Account
                                    </li>
                                </NavLink>
                                <NavLink to={"/"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Home
                                    </li>
                                </NavLink>
                                <NavLink to={"/search/all-recipes/result"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        All recipes
                                    </li>
                                </NavLink>

                                <NavLink className={`${isLoggedIn ? "hidden" : "block"}`} to={"/register"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Login / register
                                    </li>
                                </NavLink>

                                {/* to={"/login"} */}
                                <button className={`${isLoggedIn ? "block" : "hidden"}`} onClick={handleLogout}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Log out
                                    </li>
                                </button>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
