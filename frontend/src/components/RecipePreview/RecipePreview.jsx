import React, { useEffect, useState } from "react";
import img1 from "../../assets/img1.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
/**
 * when you click on the card of the recipe you will be redirected to this component
 * which actually shows all the details of the recipe.
 */
const RecipePreview = () => {
	const { recipeId } = useParams();
	const [details, setDetails] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					serverApi + `recipes/preview/${recipeId}`
				);
				console.log(response.data.data);
				setDetails(response.data.data.recipe);
			} catch (error) {
				console.log(error);
				// TODO : show en error here.
			}
		})();
	}, []);

	return (
		<div className="min-h-screen bg-slate-300">
			<div className="flex">
				{/* image selector */}
				<div className="  w-8/12 h-2/6 p-6">
					<img
						src={details?.coverImage}
						alt="Racipe image"
						className="object-cover w-full h-full rounded-md aspect-video"
					/>
				</div>

				{/* Recipe Form */}
				<div className=" w-4/12">
					{/* Your recipe form components go here */}
					<ul className=" mt-20 mx-10">
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
