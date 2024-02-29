import React, { useEffect, useState } from 'react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { RecipeCard } from "../../components/index.js"
import img1 from "../../assets/img1.jpg";

import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import r3 from "../../assets/r3.jpg";
import r4 from "../../assets/r4.jpg";
import { NavLink } from 'react-router-dom';
/**
 * in this the top recipe images will be shoed here. at the landing page.
 */

const Header = () => {
    const imgs = [r1, r2, r3, r4];
    const [currentImg, setCurrentImg] = useState(0);


    useEffect(() => {
        setInterval(() => {
            setCurrentImg(prev => prev === 3 ? 0 : prev + 1);
        }, 10000);
    }, [])

    return (
        <div className='w-full h-screen flex flex-col overflow-hidden'>
            {/* Image section */}
            <div className='w-full relative  h-2/4 md:h-3/6'>
                <div className='relative h-full'>
                    <img src={imgs[currentImg]} alt="" className='absolute object-cover w-full h-full' /> {/* Make image full-screen */}
                </div>
                <div className='absolute bottom-5 left-0 h-4 gap-4 w-full flex justify-center items-center'>
                    <span onClick={() => setCurrentImg(0)} className={

                        `h-4 w-4 cursor-pointer rounded-full ${currentImg === 0 ? "bg-gray-900" : "bg-gray-300"}`
                    }></span>

                    <span onClick={() => setCurrentImg(1)} className={

                        `h-4 w-4 cursor-pointer rounded-full ${currentImg === 1 ? "bg-gray-900" : "bg-gray-300"}`
                    }></span>

                    <span onClick={() => setCurrentImg(2)} className={

                        `h-4 w-4 cursor-pointer rounded-full ${currentImg === 2 ? "bg-gray-900" : "bg-gray-300"}`
                    }></span>

                    <span onClick={() => setCurrentImg(3)} className={

                        `h-4 w-4 cursor-pointer rounded-full ${currentImg === 3 ? "bg-gray-900" : "bg-gray-300"}`
                    }></span>
                </div>
            </div>

            {/* Top recipes section */}
            <div className='mt-4 px-4 lg:px-8'>
                <div className='flex'>
                    <label className='text-2xl lg:text-4xl font-myBold7 '>Top Recipes</label>
                </div>
                {/* <div className='w-full h-1/3 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '> */}
                <div className=' w-11/12 md:w-full md:flex justify-start flex-wrap '>

                    <NavLink to={"/recipe/tempId/preview"} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                        <RecipeCard />
                    </NavLink>
                    <NavLink to={"/recipe/tempId/preview"} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                        <RecipeCard />
                    </NavLink>
                    <NavLink to={"/recipe/tempId/preview"} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                        <RecipeCard />
                    </NavLink>
                    <NavLink to={"/recipe/tempId/preview"} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                        <RecipeCard />
                    </NavLink>
                    <NavLink to={"/recipe/tempId/preview"} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                        <RecipeCard />
                    </NavLink>
                </div>
            </div >
        </div >
    );
}

export default Header;
