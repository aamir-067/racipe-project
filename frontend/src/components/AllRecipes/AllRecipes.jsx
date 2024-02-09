/*
1. In this there will be all the recipes .
2. initially there will be only the featured recipes which you can see in the design.
3. when you search for specific recipe then only that recipes will be printed in this component.
4. example: I search for the "chicken rice recipe" then when you get the response from server then you will show only that recipes.
5. upon clicking on this recipe you will goto the Preview of the recipe.
*/

import React from 'react'
import { RecipeCard } from '../index'

const AllRecipes = () => {
    return (
        <div className='w-full h-screen'>
            <div className='w-full h-12 flex justify-end mt-1 pr-2 lg:pr-12'>
                <select name="" id=""
                    className='outline-none bg-black text-white rounded px-4 shadow-inner shadow-yellow-700'>
                    <option value="popular" >Popular</option>
                    <option value="most favorite">Most Favorite</option>
                    <option value="order by alphabets">Order by Alphabets</option>
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-dense lg:grid-cols-3 w-11/12 mx-auto'>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
    )
}

export default AllRecipes