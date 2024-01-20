import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import img1 from "../../assets/img1.jpg"

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
                    <div className='flex relative'>
                        <label className='text-2xl lg:text-4xl font-myBold7 '>Top Recipes</label>
                    </div>
                    <div className='grid grid-cols-1 mx-auto my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-96 md:w-full lg:w-full'> {/* Add gap between recipe cards */}
                        <div className='flex flex-col mx-auto my-2 bg-black text-white rounded w-48 h-60 md:w-44 lg:w-44 md:h-56 lg:h-56 shadow-black shadow-lg overflow-hidden'>
                            <img src={img1} alt="Recipe images" className='w-full h-32 transform transition-transform hover:scale-110' />
                            <p className='text-sm max-w-xs truncate p-1'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat facilis eum possimus itaque amet fugiat totam cumque unde architecto provident! Tenetur officiis veniam placeat obcaecati ratione temporibus voluptates dolorum quasi?
                            </p>
                            <div className='flex items-center justify-start p-2 mt-4'>
                                <img src={img1} alt="profile image" className='w-8 h-8 rounded-full' />
                                <div className='flex flex-col mx-1'>
                                    <label className='text-sm font-bold'> Safeer khan </label>
                                    <label className='text-blue-500 text-xs'> @Safeerkhan</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mx-auto my-2 bg-black text-white rounded w-48 h-60 md:w-44 lg:w-44 md:h-56 lg:h-56 shadow-black shadow-lg overflow-hidden'>
                            <img src={img1} alt="Recipe images" className='w-full h-32 transform transition-transform hover:scale-110' />
                            <p className='text-sm max-w-xs truncate p-1'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat facilis eum possimus itaque amet fugiat totam cumque unde architecto provident! Tenetur officiis veniam placeat obcaecati ratione temporibus voluptates dolorum quasi?
                            </p>
                            <div className='flex items-center justify-start p-2 mt-4'>
                                <img src={img1} alt="profile image" className='w-8 h-8 rounded-full' />
                                <div className='flex flex-col mx-1'>
                                    <label className='text-sm font-bold'> Safeer khan </label>
                                    <label className='text-blue-500 text-xs'> @Safeerkhan</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mx-auto my-2 bg-black text-white rounded w-48 h-60 md:w-44 lg:w-44 md:h-56 lg:h-56 shadow-black shadow-lg overflow-hidden'>
                            <img src={img1} alt="Recipe images" className='w-full h-32 transform transition-transform hover:scale-110' />
                            <p className='text-sm max-w-xs truncate p-1'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat facilis eum possimus itaque amet fugiat totam cumque unde architecto provident! Tenetur officiis veniam placeat obcaecati ratione temporibus voluptates dolorum quasi?
                            </p>
                            <div className='flex items-center justify-start p-2 mt-4'>
                                <img src={img1} alt="profile image" className='w-8 h-8 rounded-full' />
                                <div className='flex flex-col mx-1'>
                                    <label className='text-sm font-bold'> Safeer khan </label>
                                    <label className='text-blue-500 text-xs'> @Safeerkhan</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Header;
