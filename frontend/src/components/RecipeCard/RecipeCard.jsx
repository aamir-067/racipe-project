import React, { useState } from 'react';
// import { Dropzone, FileMosaic } from "@dropzone-ui/react";

/**
 * this card will represent each recipe on the AllRecipe component.
 * and this will be clickable sso that you can see the full details of the recipe in the other component.
 */

const RecipeCard = ({ details } = {}) => {

    return (
        // <>
        //     {/* cad image div */}
        //     <div className='w-96 h-full overflow-hidden mx-auto my-0 flex justify-end z-10 rounded-xl'>
        //         {/* Card Image  */}
        //         <img src={img1} alt=" racipe image" className='w-auto h-80 object-cover lg:w-full rounded-xl shadow-md shadow-black' />
        //     </div>

        //     {/* on hover this content will display */}
        //     <div className='flex absolute top-0 left-0  flex-col w-96 h-80 z-10 text-white rounded-xl hover:bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out'>

        //         <div className='w-full px-6 absolute bottom-12'>
        //             <h1 className='text-3xl font-myBold6'>Heading Here</h1>
        //         </div>

        //         {/* Username and Favorite Icon Div */}
        //         <div className='px-6 flex items-center justify-between w-full absolute bottom-2'>
        //             <div>
        //                 <h3 className='text-lg text-blue-600' title='Owner username'>@username</h3>
        //             </div>

        //             {/* Favorite Icon bottom */}
        //             <div className='text-4xl'>
        //                 <button onClick={toggleFavorite} title='Favorite'>
        //                     {
        //                         favorite ? <MdOutlineFavorite className='text-red-700' /> : <MdFavoriteBorder />
        //                     }
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="w-full relative rounded-md border">
            <img
                src={details?.coverImage ? details?.coverImage : "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"}
                alt="Laptop"
                className="h-[200px] w-full rounded-md object-cover"
            />

            <div className='absolute w-full h-full left-0 bottom-0 hover:cursor-pointer
            hover:bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out'>

                <div className='w-full px-4 absolute bottom-4'>
                    <h1 className='text-xl text-white'>{details?.name}</h1>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;