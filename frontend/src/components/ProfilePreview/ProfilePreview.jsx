import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import img1 from "../../assets/img1.jpg";
import RecipeCard from "../RecipeCard/RecipeCard";
import { NavLink, useParams } from "react-router-dom";
import { store } from "../../app/store";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import { updateData } from "../../features/userAcc.reducer";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";

const ProfilePreview = () => {
	const [recipeToggle, setRecipeToggle] = useState("uploadedRecipes");
	const { username } = useParams();

	const loggedInUser = Cookies.get("user");
	const [details, setDetails] = useState({});
	const getUserDetails = async () => {
		if (!username?.trim()) {
			// TODO : error massage
			return;
		}

		const { userAcc } = store.getState((state) => state);
		try {
			const {
				data: {
					data: { account },
				},
			} = await axios.get(serverApi + `users/p/${username}`);

			// check if you are seeing own account.
			const user = Cookies.get("user");
			const isOwn = username === user;
			isOwn &&
				store.dispatch(
					updateData({
						...userAcc,
						accDetails: {
							avatar: account.avatar,
							username: account.username,
							fullName: account.fullName,
							email: account.email,
						},
						wishListedRecipes: account?.wishlistRecipes,
						uploadedRecipes: account?.uploadedRecipes,
					})
				);
			return account;
		} catch (error) {
			console.log(error);
			//TODO error handling
			return;
		}
	};

	const handleRecipeToggle = (e) => {
		let current = e.target.value.toLowerCase();
		current === "wishlist"
			? setRecipeToggle("wishListedRecipes")
			: setRecipeToggle("uploadedRecipes");
	};
	useEffect(() => {
		getUserDetails().then((account) => {
			setDetails({
				isLogin: true,
				accDetails: {
					avatar: account.avatar,
					username: account.username,
					fullName: account.fullName,
					email: account.email,
				},
				wishListedRecipes: account?.wishlistRecipes,
				uploadedRecipes: account?.uploadedRecipes,
			});
		});
	}, []);

	return (
		<>
			<div
				className={`flex w-full box-border bg-white ${details.length ? "hidden" : ""
					}`}
			>
				<div
					className="hidden w-1/2 lg:flex flex-col "
					style={{ height: "90vh" }}
				>
					<div className="mx-auto mt-6">
						<img
							src={details?.accDetails?.avatar}
							alt="Profile Image"
							className="rounded-full w-32 h-32 object-cover border-blue-600  shadow-sm shadow-black "
						/>
					</div>
					<ul className="flex flex-col gap-6 text-center text-black mx-auto my-2 mt-12 md:p-4">
						<li className="flex justify-start gap-x-2 items-center">
							<h2 className="font-bold7 text-xl">Name :</h2>
							<h2 className="">
								{details?.accDetails?.fullName}
							</h2>
						</li>

						<li className="flex justify-start gap-x-2 items-center">
							<h2 className="font-bold7 text-xl">Username :</h2>
							<h2 className="">
								{details?.accDetails?.username}
							</h2>
						</li>

						<li className="flex justify-start gap-x-2 items-center">
							<h2 className="font-bold7 text-xl">Email :</h2>
							<h2 className="">{details?.accDetails?.email}</h2>
						</li>

						{username == loggedInUser && (
							<NavLink to={"edit"} className="rounded bg-black text-white w-32 justify-center h-10 p-3 flex items-center hover:bg-opacity-90 mt-5 mx-auto my-0 shadow-inner shadow-gray-500">
								Edit Profile
							</NavLink>
						)}
					</ul>
				</div>
				<div className="w-full flex flex-col bg-gray-400">
					<div className="w-full h-12 my-4 relative mt-4 pr-2 ">
						<select
							defaultValue={"Uploaded"}
							onChange={(e) => handleRecipeToggle(e)}
							className="w-56 float-right p-2 flex gap-5 bg-black text-white justify-center items-center h-full rounded-md"
						>
							<option className="bg-gray-800 p-2 rounded w-28">
								Wishlist
							</option>
							<option className="bg-gray-800 p-2 rounded w-28">
								Uploaded
							</option>
						</select>
					</div>
					<div className=" w-full flex justify-start items-center mx-2 gap-2 flex-wrap bg-gray-400 mb-40">
						{details[recipeToggle]?.map((item, index) => {
							return (
								<NavLink
									className={"w-4/12"}
									to={`/recipe/${item._id}/preview`}
									key={index}
								>
									<RecipeCard details={item} />
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>

			{/* Loading */}
			<div
				className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${details.length ? "" : "hidden"
					}`}
			>
				<Loading />
			</div>
		</>
	);
};

export default ProfilePreview;
