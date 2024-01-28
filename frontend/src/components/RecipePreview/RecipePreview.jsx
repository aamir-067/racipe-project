import React, { useState } from 'react';
import img1 from '../../assets/img1.jpg'

const RecipePreview = () => {

    return (
        <div className='flex flex-col -pt-5 md:pt-8 lg:pt-10 md:flex-row lg:flex-row px-2 lg:px-9 md:w-full lg:w-full h-screen gap-2 md:gap-0 lg:gap-2 overflow-hidden bg-slate-300'>

            {/* image selector */}
            <div
                className='mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0 flex justify-center items-center w-80 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 bg-black text-white '
            >
                <img src={img1} alt="Racipe image" />
            </div>


            {/* Recipe Form */}
            <div className='w-96 mt-6 md:w-full lg:w-full mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>

                {/* Your recipe form components go here */}
                <div className=" flex flex-col gap-2 mg:gap-4 lg:gap-4 items-center relative top-8 mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
                    <label type="text" placeholder='Racipe Name' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <label type="text" placeholder='Tags' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <label type="text" placeholder='Ingredient' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <p>
                    </p>

                    <button className='bg-black text-white hover:bg-opacity-90 p-2 rounded w-1/4'>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default RecipePreview
