import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoImagesOutline } from "react-icons/io5";

const EditRecipe = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        // Assuming user is only selecting one file
        const imageFile = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    return (
        <div className='flex flex-col -pt-5 md:pt-8 lg:pt-10 md:flex-row lg:flex-row px-2 lg:px-9 md:w-full lg:w-full h-screen gap-2 md:gap-0 lg:gap-2 overflow-hidden bg-slate-300'>

            {/* image selector */}
            <div
                {...getRootProps()}
                className='mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0 flex justify-center items-center w-80 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 text-white border-black border-2 border-dashed rounded-lg '
            >
                <input {...getInputProps()} />
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className="rounded-full w-40 h-40" />
                ) : (
                    <div className='flex flex-col justify-center items-center gap-4 md:gap-8 lg:gap-8'>
                        <IoImagesOutline className='text-black w-16 h-16 hover:text-blue-700' />
                        <p className='text-black'>Drag Your Image or Click to import</p>
                    </div>


                )}
            </div>


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

export default EditRecipe
