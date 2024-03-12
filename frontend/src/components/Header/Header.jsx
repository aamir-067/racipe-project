import React, { useEffect, useState } from 'react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { RecipeCard } from "../../components/index.js"
import img1 from "../../assets/img1.jpg";
import r1 from "../../assets/r1.jpg";
import r2 from "../../assets/r2.jpg";
import r3 from "../../assets/r3.jpg";
import r4 from "../../assets/r4.jpg";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { serverApi } from '../../CONSTANTS.js';
/**
 * in this the top recipe images will be shoed here. at the landing page.
 */

const Header = () => {
    const imgs = [r1, r2, r3, r4];
    const [currentImg, setCurrentImg] = useState(0);
    const [topFiveRecipes, setTopFiveRecipes] = useState([]);


    const getTopRecipes = async () => {
        try {
            const { data } = await axios.get(serverApi + "recipes/sort-by-wishlists/descending");


            const topRecipes = data.data.allRecipes;
            if (topRecipes?.length >= 5) {
                setTopFiveRecipes(topRecipes.slice(0, 5));
            } else {
                setTopFiveRecipes(topRecipes);
            }

        } catch (error) {
            console.log(error);
            // TODO : show error msg.
        }
    }

    useEffect(() => {
        getTopRecipes();
        setInterval(() => {
        }, 1000);

    }, [])

    return (
        topFiveRecipes == null ?

            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${details === null ? "" : "hidden"
                    }`}
            >
                <Loading />
            </div>
            :
            <div className={`w-full h-screen flex flex-col overflow-hidden `}>
                {/* <div className={`${topFiveRecipes == null ? "hidden" : ""}`}> */}
                {/* Image section */}
                <div className='w-full relative  h-2/4 md:h-3/6'>
                    <div className='relative h-full'>
                        <img src={topFiveRecipes[currentImg]?.coverImage} alt="" className='absolute object-cover w-full h-full' /> {/* Make image full-screen */}
                    </div>
                    <div className='absolute bottom-5 left-0 h-4 gap-4 w-full flex justify-center items-center'>
                        {
                            topFiveRecipes.map((item, index) =>
                                <span key={index} onClick={() => setCurrentImg(index)} className={`h-4 w-4 cursor-pointer rounded-full ${currentImg === index ? "bg-gray-900" : "bg-gray-300"}`}></span>
                            )
                        }
                    </div>
                </div>

                {/* Top recipes section */}
                <div className='mt-4 px-4 lg:px-8'>
                    <div className='flex'>
                        <label className='text-2xl lg:text-4xl font-myBold7 '>Top Recipes</label>
                    </div>
                    {/* <div className='w-full h-1/3 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '> */}
                    <div className=' w-11/12 md:w-full md:flex justify-start flex-wrap '>
                        {
                            topFiveRecipes?.map((recipe, index) => {
                                return (
                                    <NavLink key={index} to={`/recipe/${recipe._id}/preview`} className='my-4 mx-2 md:w-3/12 w-6/12 lg:w-2/12'>
                                        <RecipeCard details={recipe} />
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
    );
}

export default Header;
