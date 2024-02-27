import React, { useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
/**
 * No need explain.
 * position will be fixed to the top.
 */

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggle = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <nav className='flex justify-between items-center w-full h-16 bg-black text-white relative z-50'>
                <div className='w-1/2 lg:w-1/3 md:w-1/3 p-2'>
                    <h1 className='hidden md:block lg:block lg:font-myBold8 md:font-myBold8 lg:text-3xl'>Food Recipe</h1>
                    <h1 className='font-myBold8 text-5xl lg:hidden md:hidden'>FR</h1>
                </div>
                <input
                    type='search'
                    placeholder='Search for recipe ...'
                    className='p-2 outline-none rounded-3xl w-full text-black mx-1 my-0'
                />
                <div className='w-80 lg:w-1/3 relative -mt-14'>
                    <button
                        className='p-2 text-3xl bg-slate-900 z-20 rounded absolute right-4 top-1 transition'
                        onClick={toggle}
                    >
                        {openMenu ? <RxCross2 /> : <RiMenu3Line />}
                    </button>
                    {openMenu && (
                        <div className='w-full absolute right-0 -mt-4 top-16 bg-black transition-opacity'>
                            <ul className='flex flex-col w-full mt-4'>
                                <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                    <a href='#'>Link 1</a>
                                </li>
                                <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                    <a href='#'>Link 2</a>
                                </li>
                                <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                    <a href='#'>Link 3</a>
                                </li>
                                <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                    <a href='#'>Link 4</a>
                                </li>
                                <li className='flex items-center h-16 text-xl px-4 hover:bg-slate-900'>
                                    <a href='#'>Link 5</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
