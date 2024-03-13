import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoImagesOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { getRefreshToken } from '../../utils/getRefreshToken';
import axios from 'axios';
import { serverApi } from '../../CONSTANTS';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const UploadRecipe = () => {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState([null, null]);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onDrop = (acceptedFiles) => {
        // Assuming user is only selecting one file
        const imageFile = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage([imageUrl, imageFile]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });


    const handleUpload = async ({ name, description, ingredients, tags }) => {
        setLoading(true);
        try {

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                return;
                //TODO : show an error
            }

            //check whether all the fields are filled
            if ([name, description, ingredients, tags].some(item => item?.trim()?.length <= 0) || !selectedImage[1]) {
                setLoading(false);
                return;
                //TODO : show an error
            }

            await axios.post(serverApi + "recipes/upload", {
                name,
                description,
                ingredients,
                tags,
                coverImage: selectedImage[1]
            }, {
                headers: {
                    "Authorization": "Bearer " + refreshToken,
                    "Content-Type": "multipart/form-data"
                }
            })

        } catch (error) {
            console.log(error);
            // TODO : show an error
        }

        setLoading(false);
        navigate(-1);
    }

    return loading ?
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
        </div> :
        (
            <div className='flex flex-col -pt-5 md:pt-8 lg:pt-10 md:flex-row lg:flex-row px-2 lg:px-9 md:w-full lg:w-full h-screen gap-2 overflow-hidden bg-slate-300'>

                {/* image selector */}
                <div
                    {...getRootProps()}
                    className='mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0 flex justify-center items-center w-8/12 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 text-white border-black border-2 border-dashed rounded-lg '
                >
                    <input {...getInputProps()} />
                    {selectedImage[0] ? (
                        <img src={selectedImage[0]} alt="Selected" className="w-full h-full object-cover" />
                    ) : (
                        <div className='flex flex-col justify-center w-full h-full items-center gap-4 md:gap-8 lg:gap-8'>
                            <IoImagesOutline className='text-black w-full h-full hover:text-blue-700' />
                            <p className='text-black'>Drag Your Image or Click to import</p>
                        </div>


                    )}
                </div>


                {/* Recipe Form */}
                <div className="w-96 mt-6 md:w-full lg:w-full mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
                    <form onSubmit={handleSubmit(handleUpload)} className="flex flex-col gap-2 mg:gap-4 lg:gap-4 items-center relative top-8 mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
                        <input
                            {...register("name")}
                            placeholder="name"
                            className="w-10/12 rounded outline-none px-4 py-2"
                        />
                        <input
                            {...register("ingredients")}
                            type="text"
                            placeholder="ingredients"
                            className="w-10/12 rounded outline-none px-4 py-2"
                        />
                        <input
                            {...register("tags")}
                            type="text"
                            placeholder="tags"
                            className="w-10/12 rounded outline-none px-4 py-2"
                        />
                        <textarea
                            {...register("description")}
                            className="w-10/12 px-4 py-2 outline-none resize-none rounded align-top"
                            rows="4"
                            placeholder="description"
                        />

                        <button className="bg-black text-white hover:bg-opacity-90 p-2 rounded w-1/4">
                            upload
                        </button>
                    </form>
                </div>
            </div>
        )
}

export default UploadRecipe