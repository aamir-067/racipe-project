import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoImagesOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { serverApi } from "../../CONSTANTS";
import { useForm } from "react-hook-form";
import { getRefreshToken } from "../../utils/getRefreshToken";
import Loading from "../Loading/Loading";

const EditRecipe = () => {
	const [selectedImage, setSelectedImage] = useState([undefined, undefined]);
	const [details, setDetails] = useState({});
	const nameRef = useRef(null);
	const descriptionRef = useRef(null);
	const ingredientsRef = useRef(null);
	const { recipeId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { handleSubmit, register } = useForm();

	const getRecipeDetails = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				serverApi + `recipes/preview/${recipeId}`
			);
			// check if the recipe is belongs to the current logged in user.
			const { data } = await axios.get(
				serverApi + `users/p/${Cookies.get("user")}`
			);
			const { uploadedRecipes } = data.data.account;
			const isOwn = uploadedRecipes?.some((recipe) => {
				return recipe._id === recipeId;
			});
			if (!isOwn) {
				navigate(-1);
				return;
				//TODO : show an error
			}
			console.log(response.data.data.recipe);
			setDetails(response.data.data.recipe);
		} catch (error) {
			console.log(error);
			// TODO : show en error here.
		}
		setLoading(false);
	};

	const handleCoverImage = (e) => {
		e.target.files?.length &&
			setSelectedImage([
				URL.createObjectURL(e.target.files[0]),
				e.target.files[0],
			]);
	};

	const updateRecipeDetails = async () => {
		const name = nameRef?.current?.value;
		const description = descriptionRef?.current?.value;
		const ingredients = ingredientsRef?.current?.value;
		const refreshToken = getRefreshToken();
		if (!refreshToken) {
			return;
			//TODO : show an errors
		}
		setLoading(true);
		try {
			// check if the coverImage is updated.
			if (selectedImage[1]) {
				await axios.patch(
					serverApi + `recipes/edit-recipe/${recipeId}/cover-image`,
					{
						coverImage: selectedImage[1],
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
							"Content-Type": "multipart/form-data",
						},
					}
				);
			}
			// check if the recipe name is updated.
			if (name?.trim()) {
				await axios.patch(
					serverApi + `recipes/edit-recipe/${recipeId}/name`,
					{
						name,
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
						},
					}
				);
			}

			// check if the recipe ingredients is updated.
			if (ingredients) {
				await axios.patch(
					serverApi + `recipes/edit-recipe/${recipeId}/ingredients`,
					{
						ingredients,
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
						},
					}
				);
			}
			// check if the recipe description is updated.
			if (description) {
				await axios.patch(
					serverApi + `recipes/edit-recipe/${recipeId}/description`,
					{
						description,
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
						},
					}
				);
			}
		} catch (error) {
			console.log(error);
			// TODO : show en error here.
		}
		setLoading(false);
		navigate(-1);
	};

	useEffect(() => {
		getRecipeDetails();
	}, []);

	return loading ? (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Loading />
		</div>
	) : (
		<div className="flex flex-col -pt-5 md:pt-8 lg:pt-10 md:flex-row lg:flex-row px-2 lg:px-9 md:w-full lg:w-full h-screen gap-2 md:gap-0 lg:gap-2 overflow-hidden bg-slate-300">
			{/* image selector */}
			<div className="mx-auto my-0 flex justify-center items-center w-80 -mt-5 mb-4 md:mb-0 lg:mb-0 lg:w-full md:w-full md:h-1/4 lg:h-1/2 h-1/3 relative top-12 text-white rounded">
				<div className="bg-black duration-200 ease-in-out w-full h-2/5 z-10 absolute bottom-0 opacity-0 hover:opacity-100">
					<input
						onChange={handleCoverImage}
						type="file"
						accept="image/*"
						className="cursor-pointer absolute w-full h-full opacity-0"
					/>
					<p className="text-center my-3 opacity-100 text-lg font-myBold6">
						Select Image
					</p>
				</div>
				<img
					src={
						selectedImage[0]
							? selectedImage[0]
							: details?.coverImage
					}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Recipe Form */}
			<div className="w-96 mt-6 md:w-full lg:w-full mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0">
				<form
					onSubmit={updateRecipeDetails}
					className="flex flex-col gap-2 mg:gap-4 lg:gap-4 items-center relative top-8 mx-auto my-0 md:mx-0 md:my-0 lg:mx-0 lg:my-0"
				>
					<input
						defaultValue={details.name}
						ref={nameRef}
						placeholder="name"
						className="w-10/12 rounded outline-none px-4 py-2"
					/>
					<input
						type="text"
						defaultValue={details.ingredients?.join(", ")}
						ref={ingredientsRef}
						placeholder="ingredients"
						className="w-10/12 rounded outline-none px-4 py-2"
					/>
					<textarea
						className="w-10/12 px-4 py-2 outline-none resize-none rounded align-top"
						rows="4"
						defaultValue={details.description}
						ref={descriptionRef}
						placeholder="description"
					/>

					<button className="bg-black text-white hover:bg-opacity-90 p-2 rounded w-1/4">
						update
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditRecipe;
