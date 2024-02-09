import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import img1 from '../../assets/img1.jpg'
import RecipeCard from '../RecipeCard/RecipeCard';
/**
 * when you goto profile then you will show this component.
 * route to this profile will be like   localhost:3000/:username
 */

const ProfilePreview = () => {
    const [toggle, setToggle] = useState(false)



    return (
        <>
            <div className='flex w-full box-border bg-white'>

                <div className='hidden w-1/2 lg:flex flex-col '
                    style={{ height: "90vh" }}>
                    <div className='mx-auto mt-6'>
                        <img src={img1} alt="Profile Image" className='rounded-full w-32 h-32 object-cover border-blue-600  shadow-sm shadow-black ' />
                    </div>
                    <div className='flex flex-col gap-6 text-center text-black mx-auto my-2 mt-12 md:p-4'>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">Safeer Khan</label>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">@SafeerKhan</label>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">@Email.com</label>
                        <button className='rounded bg-black text-white w-32 justify-center h-10 p-3 flex items-center hover:bg-opacity-90 mt-5 mx-auto my-0 shadow-inner shadow-gray-500'>Edit Profile</button>
                    </div>
                </div>
                <div className='w-full flex flex-col bg-gray-400'>
                    <div className='w-full z-20 absolute top-20 right-0 md:hidden lg:hidden'>
                        <button
                            className='text-3xl float-right pr-4'
                            onClick={() => setToggle(!toggle)}>
                            {
                                toggle ? <IoIosArrowUp /> : <IoIosArrowDown />
                            }
                        </button>
                        {
                            toggle ? (
                                <div className='w-full flex flex-col items-end -mt-10'>
                                    <div className='w-36 h-32 flex flex-col justify-center bg-black gap-3 rounded'>
                                        <button className=' text-white hover:bg-gray-800 h-1/3'>Uploaded</button>
                                        <button className=' text-white hover:bg-gray-800 h-1/3'>Wishlist</button>
                                    </div>
                                </div>
                            ) : (null)
                        }
                    </div>
                    <div className='hidden md:block lg:block md:w-full md:h-12 lg:h-12 lg:w-full lg:relative md:relative mt-1 pr-2 '>
                        <div className='w-56 md:float-right lg:float-right p-2 flex gap-5 bg-black text-white justify-center items-center h-full rounded'>
                            <button
                                className='bg-gray-800 p-2 rounded w-28'>
                                Wishlist
                            </button>
                            <button
                                className='bg-gray-800 p-2 rounded w-28'>
                                Uploaded
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full overflow-scroll pl-6 bg-gray-400 md:hideScroll lg:hideScroll'
                        style={{ height: "85vh" }}
                    >
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
            </div>
        </>
    )
}

export default ProfilePreview