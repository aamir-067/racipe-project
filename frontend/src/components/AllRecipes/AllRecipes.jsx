/*
1. In this there will be all the recipes .
2. initially there will be only the featured recipes which you can see in the design.
3. when you search for specific recipe then only that recipes will be printed in this component.
4. example: I search for the "chicken rice recipe" then when you get the response from server then you will show only that recipes.
5. upon clicking on this recipe you will goto the Preview of the recipe.
*/

import React, { useEffect, useState } from 'react'
import { RecipeCard } from '../index'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import { serverApi } from '../../CONSTANTS';

const AllRecipes = () => {
    const [filter, setFilter] = useState("sort-by-date/descending");
    const [recipes, setRecipes] = useState([]);


    const { searchQuery } = useParams();

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const fetchRecipes = async () => {
        try {
            if (searchQuery === "all-recipes") {
                const { data } = await axios.get(serverApi + `recipes/${filter}`);
                setRecipes(data?.data.allRecipes);
            } else {

                let [searchFilter, asc] = filter.split('/');
                // modify the parameters.
                let search;
                switch (searchFilter) {
                    case "sort-by-date":
                        search = "createdAt"
                        break;
                    case "sort-by-name":
                        search = "name"
                        break;
                    case "sort-by-wishlists":
                        search = "wishlistsCount"
                        break;
                }
                asc = asc === "ascending" ? true : false;

                // sent the request
                const { data } = await axios.post(serverApi + `recipes/search-recipe`, {
                    search: searchQuery,
                    asc: asc ? "yes" : "no",
                    filter: search
                });
                setRecipes(data.data);

            }
        } catch (error) {
            console.log(error);
            // TODO :  show error here
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [filter, searchQuery]);

    return (
        <div className='w-full h-screen'>
            <div className='w-full h-12 flex justify-end pr-2 lg:pr-12 mt-2'>
                <select defaultValue={"sort-by-date/descending"} onChange={handleFilter}
                    className='outline-none bg-black text-white rounded px-4'>
                    <option value={"sort-by-date/descending"} >Most Recent</option>
                    <option value={"sort-by-date/ascending"}>Older</option>
                    <option value={"sort-by-wishlists/descending"}>Most Popular</option>
                    <option value={"sort-by-wishlists/ascending"}>Least Popular</option>
                    <option value={"sort-by-name/ascending"}>A - Z</option>
                    <option value={"sort-by-name/descending"}>Z - A</option>
                </select>
            </div>
            <div className='w-full flex p-1 justify-center md:justify-start items-center flex-wrap'>
                {
                    recipes?.map(recipe => {
                        return <NavLink key={recipe._id} to={`/recipe/${recipe?._id}/preview`} className=' md:w-4/12 w-full lg:w-3/12 p-1'>
                            <RecipeCard details={recipe} />
                        </NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default AllRecipes