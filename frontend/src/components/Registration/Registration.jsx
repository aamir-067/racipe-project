import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoImagesOutline } from "react-icons/io5";
import bg from "../../assets/bg.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { serverApi } from "../../CONSTANTS";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
const Registration = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();

	const onDrop = (acceptedFiles) => {
		// Assuming user is only selecting one file
		const imageFile = acceptedFiles[0];
		const imageUrl = URL.createObjectURL(imageFile);
		setSelectedImage(imageUrl);
	};
	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		onDrop,
	});

	// function to register user.
	const registerUser = async (data) => {
		// check if all is valid,
		const isValuesExists = Object.values(data).every((item) => {
			if (item) {
				return item.trim() ? true : false;
			}
			return false;
		});

		let avatar = null;

		if (selectedImage) {
			const blobImage = await fetch(selectedImage).then((r) => r.blob());
			avatar = new File([blobImage], "avatar.jpg");
		}

		// check if both passwords are same.
		const isBothPasswordsSame = data.password === data.rePassword;
		if (!(isBothPasswordsSame && isValuesExists)) {
			// show error message
			return;
		}

		setIsLoading(true);
		// sent the response to the server
		let response;
		try {
			response = await axios.post(
				serverApi + "users/register",
				{
					username: data.username,
					email: data.email,
					password: data.password,
					fullName: data.name,
					avatar,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		} catch (error) {
			console.log(error.response.data);
		}

		// check the response it its correct.
		if (!response?.data?.success) {
			// error occurred
		}

		const mainData = response?.data?.data;
		console.log(mainData);

		setIsLoading(false);
		navigate("/login");
	};

	return (
		<>
			<div className="relative w-full box-border h-screen">
				<div className="w-full h-full flex justify-center items-center">
					<img
						src={bg}
						alt="background image"
						className="absolute w-full h-screen object-cover brightness-75"
					/>
					<div className="absolute w-96 z-10 py-4 mt-12 pl-4 text-center bg-white bg-opacity-45 rounded-lg flex flex-col">
						<div
							className={`w-full h-full ${isLoading ? "opacity-0" : "opacity-100"
								}`}
						>
							{/* Profile Image Drag and Drop or Select through click */}
							<div
								{...getRootProps()}
								className="bg-gray-400 mb-3 rounded-full w-32 h-32 flex justify-center items-center cursor-pointer hover:bg-gray-500 mx-28"
							>
								<input {...getInputProps()} />
								{selectedImage ? (
									<img
										src={selectedImage}
										alt="Selected"
										className="rounded-full w-32 object-cover h-32"
									/>
								) : (
									<IoImagesOutline className="w-16 h-16 hover:text-blue-700" />
								)}
							</div>

							{/* Registration Form of inputs */}
							<div className="w-full z-30 flex flex-col ml-4">
								<form
									onSubmit={handleSubmit(registerUser)}
									className="text-center flex flex-col"
								>
									<input
										{...register("name")}
										type="text"
										className="my-2 p-3 rounded outline-none h-10 text-black w-80"
										placeholder="Name"
									/>
									<input
										{...register("username")}
										type="text"
										className="my-2 p-3 rounded outline-none h-10 text-black w-80"
										placeholder="Username"
									/>
									<input
										{...register("email")}
										type="email"
										className="my-2 p-3 rounded outline-none h-10 text-black w-80"
										placeholder="Email"
									/>
									<input
										{...register("password")}
										type="password"
										className="my-2 p-3 rounded outline-none h-10 text-black w-80"
										placeholder="Password"
									/>
									<input
										{...register("rePassword")}
										type="password"
										className="my-2 p-3 rounded outline-none h-10 text-black w-80"
										placeholder="Re-enter Password"
									/>

									<NavLink to={"/login"}>
										<label className="mr-12 text-center">
											Already Account ?{" "}
											<label className="cursor-pointer text-blue-700">
												Login
											</label>
										</label>
									</NavLink>

									<div className="w-96 mx-auto my-0 text-center pr-10">
										<button className="w-32 rounded-xl p-2 bg-black text-white hover:bg-opacity-90 mt-6">
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>

						{/* Loading sections */}
						<div
							className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isLoading ? "" : "hidden"
								}`}
						>
							<Loading />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Registration;
