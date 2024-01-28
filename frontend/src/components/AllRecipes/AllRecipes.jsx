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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full pl-6'>
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