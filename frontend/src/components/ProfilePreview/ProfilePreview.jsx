import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import img1 from '../../assets/img1.jpg'
import RecipeCard from '../RecipeCard/RecipeCard';
import { useParams } from 'react-router-dom';
import { store } from '../../app/store';
import axios from 'axios';
import { serverApi } from '../../CONSTANTS';
import { updateData } from '../../features/userAcc.reducer';
import Cookies from "js-cookie";

const ProfilePreview = () => {
    const [toggle, setToggle] = useState(false)
    const [recipeToggle, setRecipeToggle] = useState(false)
    const { username } = useParams();

    const loggedInUser = Cookies.get("user");

    const [details, setDetails] = useState({});
    const getUserDetails = async () => {
        if (!username?.trim()) {
            // TODO : error massage
            return;
        }

        const { userAcc } = store.getState(state => state);
        try {

            const { data: { data: { account } } } = await axios.get(serverApi + `users/p/${username}`);
            console.log(account);

            store.dispatch(updateData({
                ...userAcc,
                accDetails: {
                    ...userAcc.accDetails,
                    avatar: account.avatar,
                    username: account.username,
                    fullName: account.fullName,
                    email: account.email
                },
                wishListedRecipes: account.wishListRecipes,
                uploadedRecipes: account.uploadedRecipes,
            }))


            return account;


        } catch (error) {
            console.log(error);
            //TODO error handling
            return;
        }
    }


    const handleRecipeToggle = (e) => {
        const current = e.target.value.toLowerCase();
        current === "wishlist" ? setRecipeToggle("wishListedRecipes") : setRecipeToggle("uploadedRecipes");
    }
    useEffect(() => {
        getUserDetails()
            .then(() => {
                let data = store.getState().userAcc;
                setDetails(data);
            })
    }, []);

    return (
        <>
            <div className='flex w-full box-border bg-white'>

                <div className='hidden w-1/2 lg:flex flex-col '
                    style={{ height: "90vh" }}>
                    <div className='mx-auto mt-6'>
                        <img src={details?.accDetails?.avatar} alt="Profile Image" className='rounded-full w-32 h-32 object-cover border-blue-600  shadow-sm shadow-black ' />
                    </div>
                    <div className='flex flex-col gap-6 text-center text-black mx-auto my-2 mt-12 md:p-4'>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">{details?.accDetails?.fullName}</label>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">{details?.accDetails?.username}</label>
                        <label className="rounded bg-white w-72 md:w-52 h-10 p-2 flex items-center text-sm shadow-gray-500 shadow-inner">{details?.accDetails?.email}</label>
                        {
                            username == loggedInUser &&
                            <button className='rounded bg-black text-white w-32 justify-center h-10 p-3 flex items-center hover:bg-opacity-90 mt-5 mx-auto my-0 shadow-inner shadow-gray-500'>Edit Profile</button>
                        }
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
                        <select onChange={(e) => handleRecipeToggle(e)} className='w-56 md:float-right lg:float-right p-2 flex gap-5 bg-black text-white justify-center items-center h-full rounded'>
                            <option
                                className='bg-gray-800 p-2 rounded w-28'>
                                Wishlist
                            </option>
                            <option
                                className='bg-gray-800 p-2 rounded w-28'>
                                Uploaded
                            </option>
                        </select>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full overflow-scroll pl-6 bg-gray-400 md:hideScroll lg:hideScroll'
                        style={{ height: "85vh" }}
                    >
                        {
                            details[recipeToggle]?.map((item, index) => {
                                return <div key={index}><RecipeCard /></div>
                            })
                        }
                        {/* <RecipeCard /> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePreview