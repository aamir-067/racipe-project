import React, { useState } from 'react';
import { Dropzone, FileMosaic } from "@dropzone-ui/react";

const RecipeCard = () => {
    const [file, setFile] = useState([]);

    const updateFiles = (incomingFile) => {
        setFile(incomingFile);
    }

    return (
        <div className='flex flex-col -pt-5 md:pt-8 lg:pt-10 md:flex-row lg:flex-row px-2 lg:px-9 md:w-full lg:w-full h-screen gap-2 md:gap-0 lg:gap-2 overflow-hidden bg-slate-300'>

            {/* image selector */}
            <Dropzone
                onChange={updateFiles}
                accept='image/*'
                value={file}
                className='mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0 flex justify-center items-center w-80 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 bg-black text-white '
            >
                {file.length > 0 ? (
                    <FileMosaic
                        {...file[0]}
                        preview // Adjust image size and cover
                    />
                ) : (
                    <div className='border-none md:border-4 md:border-blue-600 md:border-dashed lg:border-4 lg:border-blue-600 lg:border-dashed p-2 md:p-4 lg:p-4 rounded-lg'>
                        <p className='text-sm md:text-lg lg:text-xl'>Drag & Drop or click to select an image</p>
                    </div>
                )}
            </Dropzone>


            {/* Recipe Form */}
            <div className='w-96 mt-6 md:w-full lg:w-full mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>

                {/* Your recipe form components go here */}
                <form className=" flex flex-col gap-2 mg:gap-4 lg:gap-4 items-center relative top-8 mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
                    <input type="text" placeholder='Racipe Name' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <input type="text" placeholder='Tags' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <input type="text" placeholder='Ingredient' className='outline-none p-2 rounded shadow-sm shadow-black w-80 md:w-1/2 lg:w-1/2' />
                    <textarea name="" id="" cols="25" rows="5"
                    placeholder='Description'
                    className='p-3 outline-none shadow-sm shadow-black rounded w-80 md:w-1/2 lg:w-1/2'>
                    </textarea>

                    <button className='bg-black text-white hover:bg-opacity-90 p-2 rounded w-1/4'>Upload</button>
                </form>
            </div>
        </div>
    );
}

export default RecipeCard;
