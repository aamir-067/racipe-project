import React, { useState } from 'react';
// import { Dropzone, FileMosaic } from "@dropzone-ui/react";

/**
 * this card will represent each recipe on the AllRecipe component.
 * and this will be clickable sso that you can see the full details of the recipe in the other component.
 */

const RecipeCard = ({ details } = {}) => {

    return (
        <div className="w-full relative rounded-md">
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