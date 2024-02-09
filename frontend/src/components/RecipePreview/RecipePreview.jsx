import React, { useState } from 'react';
import img1 from '../../assets/img1.jpg'
/**
 * when you click on the card of the recipe you will be redirected to this component
 * which actually shows all the details of the recipe.
 */
const RecipePreview = () => {

    return (
        <div className='flex flex-col -pt-5 md:pt-20 lg:pt-24 md:flex-row lg:flex-row px-2 lg:px-9 h-screen md:w-full lg:w-full gap-2 md:gap-0 lg:gap-2 overflow-hidden bg-slate-300'
        >

            {/* image selector */}
            <div
                className='mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0 flex justify-center items-center w-80 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 rounded-lg'
            >
                <img src={img1} alt="Racipe image" className="object-cover rounded-lg" />
            </div>


            {/* Recipe Form */}
            <div className='w-96 md:mt-14 lg:mt-16 md:w-full lg:w-full mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>

                {/* Your recipe form components go here */}
                <div className=" flex flex-col gap-8 mg:gap-8 lg:gap-8 items-center relative top-8 mt-9 mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
                    <label type="text" className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2'>
                        title
                    </label>
                    <span type="text" className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2'>
                        tags
                    </span>
                    <p type="text" className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2'>
                        ingredients
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecipePreview
