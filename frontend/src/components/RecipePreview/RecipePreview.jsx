import React, { useEffect, useState } from "react";
import wishListBadgeShallow from "../../assets/emptyWishList.png";
import wishListBadgeFill from "../../assets/filledWishlist.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import { store } from "../../app/store";
import { getRefreshToken } from "../../utils/getRefreshToken";
import { updateData } from "../../features/userAcc.reducer";

const RecipePreview = () => {
	const { recipeId } = useParams();
	const [details, setDetails] = useState(null);
	const [ownerRecipe, setOwnerRecipe] = useState(false);
	const [isWishlist, setIsWishlist] = useState(false);

	const isAlreadyWishlist = async (_id = "") => {
		const wishListedRecipes = await fetchUserWishlists();

		// console.log(wishListedRecipes);
		const isWishListed = wishListedRecipes.some(recipe => {
			console.log(recipe?._id == _id);
			return recipe?._id == _id ? true : false;
		})


		console.log(isWishListed ? "use already wishlist this recipe" : "user not wishlist this recipe");

		setIsWishlist(isWishListed);
	}

	const isOwner = () => {
		const { uploadedRecipes } = store.getState().userAcc;


		const isOwnerRecipe = uploadedRecipes.some(recipe => {
			return recipe?._id === details?._id ? true : false;
		})

		setOwnerRecipe(isOwnerRecipe);
	}

	const fetchUserWishlists = async () => {
		const username = store.getState().userAcc.accDetails.username;
		const refreshToken = getRefreshToken();
		const response = await axios.get(serverApi + `users/${username}/wishlists`, {
			headers: {
				"authorization": `Bearer ${refreshToken}`
			}
		});
		store.dispatch(updateData({
			...store.getState().userAcc,
			wishListedRecipes: response.data.data.wishListedRecipes
		}));
		return response.data.data.wishListedRecipes;
	}

	const handleWishList = async () => {
		const refreshToken = getRefreshToken();
		if (!refreshToken) {
			alert("Please login first!");
			return;
		}

		try {

			if (!isWishlist) {
				console.log(isWishlist, "calling if part");
				let { data } = await axios.post(
					serverApi + "recipes/add-to-wishlist",
					{ recipeId: details._id }, {
					headers: {
						"authorization": `Bearer ${refreshToken}`
					}
				});

			} else {
				console.log(isWishlist, "calling else part");
				let { data } = await axios.post(
					serverApi + "recipes/remove-from-wishlist",
					{ recipeId: details._id }, {
					headers: {
						"authorization": `Bearer ${refreshToken}`
					}
				});
			}

			// fetch the user wishlists.
			await getRecipeDetails();
		} catch (error) {
			console.log(error);
			// TODO : show en error here.
		}
	}

	const getRecipeDetails = async () => {
		try {
			const response = await axios.get(
				serverApi + `recipes/preview/${recipeId}`
			);
			setDetails(response.data.data.recipe);
			// await fetchUserWishlists();
			await isAlreadyWishlist(response.data.data.recipe._id);
		} catch (error) {
			console.log(error);
			// TODO : show en error here.
		}
	}

	useEffect(() => {
		getRecipeDetails().then(() =>
			isOwner()
		)


	}, []);

	return (
		<div className="min-h-screen bg-slate-300">
			<div className="flex">
				{/* image selector */}
				<div className="  w-8/12 h-2/6 p-6">
					<img
						src={details?.coverImage}
						alt="Recipe image"
						className="object-cover w-full h-full rounded-md aspect-video"
					/>
				</div>

				{/* Recipe Form */}
				<div className=" w-4/12">

					<div className="flex justify-between items-center h-14 mx-4 mt-10">
						<div className="flex w-4/12 justify-start h-full items-center">
							<button onClick={handleWishList} ><img className="object-cover w-8 h-8 rounded-md aspect-square" src={isWishlist ? wishListBadgeFill : wishListBadgeShallow} /></button>
							<p className="text-xl px-1 font-myBold6">{details?.wishlistsCount}</p>
						</div>

						<div className={`flex justify-center gap-x-2 items-center ${ownerRecipe ? "opacity-100" : "opacity-0"}`}>
							<button className="rounded bg-black text-white w-32 p-3 hover:bg-opacity-90">edit</button>
							<button className="rounded bg-black text-white w-32 p-3 hover:bg-opacity-90">delete</button>
						</div>
					</div>
					{/* Your recipe form components go here */}
					<ul className=" mt-10 mx-4">
						<li className="flex justify-start items-center gap-x-5">
							<h2 className="font-bolder text-2xl ">Name:</h2>
							<p className="">{details?.name}</p>
						</li>

						<li className="flex justify-start my-4 items-baseline gap-x-5">
							<h2 className="font-bolder text-2xl ">
								Ingredients:
							</h2>
							<p className="">
								{details?.ingredients?.join(", ")}
							</p>
						</li>

						<li className="flex justify-start items-baseline gap-x-5">
							<h2 className="font-bolder text-2xl ">Tags:</h2>
							<p className="">{details?.tags?.join(", ")}</p>
						</li>
					</ul>
				</div>
			</div>

			{/* description */}
			<div className="mx-5">
				<h2 className="font-bolder text-2xl">description:</h2>
				<p className="ml-4">{details?.description}</p>
			</div>
		</div>
	);
};

export default RecipePreview;
