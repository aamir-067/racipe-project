import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { RecipeCard } from "../../components/index.js"
import img1 from "../../assets/img1.jpg"
/**
 * in this the top recipe images will be shoed here. at the landing page.
 */

import React from 'react'

const Header = () => {
    return (
        <>
            <div className='w-full h-auto flex flex-col overflow-hidden'>
                {/* Image section */}
                <div className='w-full h-80'>
                    <div className='relative h-full'>
                        <img src={img1} alt="" className='absolute inset-0 object-cover w-full h-full' /> {/* Make image full-screen */}

                        {/* Left and Right Arrows */}
                        <div className='absolute inset-0 flex items-center justify-between h-full mx-4 md:mx-8 lg:mx-12'>
                            <button className='p-2 text-4xl hover:-translate-x-3 transition-all z-20 hover:bg-yellow-400 hover:bg-opacity-50 hover:rounded-full'> <FaAnglesLeft /> </button>
                            <button className='p-2 text-4xl hover:translate-x-3 transition-all z-20 hover:bg-yellow-400 hover:bg-opacity-50 hover:rounded-full'> <FaAnglesRight /> </button>
                        </div>
                    </div>
                </div>

                {/* Top recipes section */}
                <div className='mt-4 px-4 lg:px-8'>
                    <div className='flex'>
                        <label className='text-2xl lg:text-4xl font-myBold7 '>Top Recipes</label>
                    </div>
                    <div className='w-full h-1/3 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                        <RecipeCard />
                        <RecipeCard />
                        <RecipeCard />
                        <RecipeCard />
                        <RecipeCard />
                    </div>
                </div >
            </div >
        </>
    );
}

export default Header;
