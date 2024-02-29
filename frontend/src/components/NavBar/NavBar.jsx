import React, { useRef, useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from "react-router-dom";
/**
 * No need explain.
 * position will be fixed to the top.
 */

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const searchRef = useRef(null);

    const handleRef = () => {
        let value = searchRef.current?.value;
        console.log(value);
    }

    return (
        <>
            <nav className='flex pl-8 justify-between items-center w-full h-16 bg-black text-white relative'>
                <NavLink to={"/"} onClick={() => setOpenMenu(false)} className='w-1/2 lg:w-1/3 md:w-1/3 p-2'>
                    <div >
                        <h1 className='hidden lg:block font-bolder md:text-2xl text-lg lg:text-3xl'>Aamfeer Kitchen</h1>
                        <h1 className='font-myBold8 text-5xl lg:hidden'>AK</h1>
                    </div>
                </NavLink>
                <form className='p-2 pl-4 outline-black rounded w-8/12 text-black mx-1 my-0'>
                    <input
                        type='search'
                        ref={searchRef}
                        placeholder='Search for recipe ...'
                        className='p-2 pl-4 outline-black rounded w-8/12 text-black mx-1 my-0'
                    />
                </form>

                <div className='w-full lg:w-1/3 relative -mt-14'>
                    <button
                        className='p-2 text-3xl bg-slate-900 z-20 rounded absolute right-4 top-1 transition'
                        onClick={() => setOpenMenu(prev => !prev)}
                    >
                        {openMenu ? <RxCross2 /> : <RiMenu3Line />}
                    </button>
                    {openMenu ? (
                        <div className='w-full absolute right-0 -mt-4 top-16 z-10 bg-black transition-opacity'>
                            <ul className='flex flex-col w-full mt-4'>
                                <NavLink to={"/"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Home
                                    </li>
                                </NavLink>

                                <NavLink to={"/register"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Login / register
                                    </li>
                                </NavLink>

                                <NavLink to={"/login"} onClick={() => setOpenMenu(false)}>
                                    <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                        Log out
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    ) : ""}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
