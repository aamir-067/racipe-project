import React, { useState } from 'react';
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import img1 from "../../assets/img1.jpg"

const RecipeCard = () => {
    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        setFavorite(!favorite)
    }
    return (
        <>
            <div className=' relative w-96 md:w-full lg:w-full h-full grid grid-cols-1 mx-auto my-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 '>

                {/* cad image div */}
                <div className='w-96 h-full overflow-hidden mx-auto my-0 flex justify-end z-10 rounded-xl'>
                    {/* Card Image  */}
                    <img src={img1} alt=" racipe image" className='w-auto h-80 object-cover lg:w-full rounded-xl shadow-md shadow-black' />
                </div>

                {/* on hover this content will display */}
                <div className='flex absolute top-0 left-0  flex-col w-96 h-80 z-10 text-white rounded-xl hover:bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out'>

                    <div className='w-full px-6 absolute bottom-12'>
                        <h1 className='text-3xl font-myBold6'>Heading Here</h1>
                    </div>

                    {/* Username and Favorite Icon Div */}
                    <div className='px-6 flex items-center justify-between w-full absolute bottom-2'>
                        <div>
                            <h3 className='text-lg text-blue-600' title='Owner username'>@username</h3>
                        </div>

                        {/* Favorite Icon bottom */}
                        <div className='text-4xl'>
                            <button onClick={toggleFavorite} title='Favorite'>
                                {
                                    favorite ? <MdOutlineFavorite className='text-red-700' /> : <MdFavoriteBorder />
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default RecipeCard;
