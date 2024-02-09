import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoImagesOutline } from "react-icons/io5";
/*
No need to explain. cleared from the name.
Note: when you goto this component there will be the current value in the input tag's placeholders.
*/

const EditProfile = () => {
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
        <div className='w-full h-screen flex flex-col overflow-x-hidden box-border bg-gray-200'>
            <div className='w-full h-1/3 flex justify-center'>
                <div {...getRootProps()} className="bg-gray-300 mt-10 rounded-full w-40 h-40 flex justify-center items-center cursor-pointer hover:bg-gray-400">
                    <input {...getInputProps()} />
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="rounded-full w-40 h-40" />
                    ) : (
                        <IoImagesOutline className='w-16 h-16 hover:text-blue-700' />
                    )}
                </div>
            </div>
            <div className='w-96 h-full mx-auto my-0'>
                <form className="text-center flex flex-col">
                    <input type="text" className='my-4 p-3 rounded outline-none h-10 text-black' placeholder='Enter Name' />
                    <input type="text" className='my-4 p-3 rounded outline-none h-10 text-black' placeholder='Old Password' />
                    <input type="text" className='my-4 p-3 rounded outline-none h-10 text-black' placeholder='New Password' />
                    <input type="text" className='my-4 p-3 rounded outline-none h-10 text-black' placeholder='Confirm Password' />
                    <label className="red">Old Password Wrong</label>
                    <button className='w-32 rounded-xl p-4 bg-black text-white hover:bg-opacity-90 mx-auto my-5'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
