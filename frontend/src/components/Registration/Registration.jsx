import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoImagesOutline } from "react-icons/io5";
import img1 from "../../assets/img1.jpg"


const Registration = () => {
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
        <>
            <div className="relative w-full box-border" style={{ height: "80vh" }}>
                <div className="w-full h-full flex justify-center items-center">
                    <img src={img1} alt="background image" className="absolute w-full h-screen object-cover brightness-75" />
                    <div className="absolute w-96 z-10 py-4 mt-12 pl-4 text-center bg-white bg-opacity-45 rounded-lg flex flex-col">

                        {/* Profile Image Drag and Drop or Select through click */}
                        <div {...getRootProps()} className="bg-gray-400 mb-3 rounded-full w-32 h-32 flex justify-center items-center cursor-pointer hover:bg-gray-500 mx-28">
                            <input {...getInputProps()} />
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="rounded-full w-40 h-40" />
                            ) : (
                                <IoImagesOutline className='w-16 h-16 hover:text-blue-700' />
                            )}
                        </div>

                        {/* Registration Form of inputs */}
                        <div className="w-full z-30 flex flex-col ml-4">
                            <form className="text-center flex flex-col">
                                <input type="text" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Name' />
                                <input type="email" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Email' />
                                <input type="password" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Password' />
                                <input type="password" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Password' />
                                <label className="mr-12 text-center">Already Account ? <label className='cursor-pointer text-blue-700'>Login</label></label>
                            </form>
                        </div>

                        <div className='w-96 mx-auto my-0 text-center pr-10'>
                            <button className='w-32 rounded-xl p-2 bg-black text-white hover:bg-opacity-90 mt-6'>Registration</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default Registration;
