import React, { useEffect, useRef, useState } from "react";
import { store } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";
import { getRefreshToken } from "../../utils/getRefreshToken";
import { useForm } from "react-hook-form";

const EditProfile = () => {
	const [accDetails, setAccDetails] = useState({});
	const [newAvatar, setNewAvatar] = useState([undefined, undefined]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { username } = useParams();

	const { handleSubmit, register } = useForm();

	const updateData = async ({ name, oldPass, newPass, newPassV2 }) => {
		setLoading(true);
		// check what the user want to update ??.
		const refreshToken = getRefreshToken();

		if (!refreshToken) {
			return;
			//TODO : show here an error
		}

		try {
			if (newAvatar[1]) {
				// update the avatar.
				const { data } = await axios.post(
					serverApi + "users/change-avatar",
					{
						avatar: newAvatar[1],
					},
					{
						headers: {
							authorization: "Bearer " + refreshToken,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				if (!data.success) {
					return;
					//TODO : show and error here
				}
			}

			if (newPass && newPass === newPassV2) {
				// update the password
				const { data } = await axios.post(
					serverApi + "users/change-password",
					{
						newPassword: newPass,
						currentPassword: oldPass,
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
						},
					}
				);

				if (!data.success) {
					return;
					//TODO : show and error here
				}
			}

			if (name && accDetails.fullName !== name?.trim()) {
				// update the name
				const { data } = await axios.post(
					serverApi + "users/change-fullName",
					{
						fullName: name?.trim(),
					},
					{
						headers: {
							Authorization: "Bearer " + refreshToken,
						},
					}
				);

				if (!data.success) {
					return;
					//TODO : show and error here
				}
			}
		} catch (error) {
			console.log(error);
			//TODO : show error here
		}

		setLoading(false);

		//TODO: show a success prompt.
		navigate(-1);
	};

	const handleAvatar = (e) => {
		let file = e.target.files;
		file?.length > 0 &&
			setNewAvatar([URL.createObjectURL(file[0]), file[0]]);
	};

	const getUserDetails = async () => {
		setLoading(true);
		if (!username?.trim()) {
			// TODO : error massage
			return;
		}

		try {
			const {
				data: {
					data: { account },
				},
			} = await axios.get(serverApi + `users/p/${username}`);

			// check if you are seeing own account.
			const user = Cookies.get("user");
			const isOwn = username === user;
			if (!isOwn) {
				return;
				//TODO : show here an error.
			}
			setAccDetails(account);
		} catch (error) {
			console.log(error);
			//TODO error handling
			return;
		}
		setLoading(false);
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	return loading ? (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Loading />
		</div>
	) : (
		<div className="w-full h-screen flex flex-col overflow-x-hidden box-border bg-gray-200">
			<div className="w-full h-1/3 flex justify-center">
				<div className="bg-gray-300 mt-10 overflow-hidden rounded-full w-40 h-40 relative flex justify-center items-center cursor-pointer">
					<img
						src={newAvatar[0] ? newAvatar[0] : accDetails?.avatar}
						className="rounded-full object-cover aspect-square"
					/>
					<div className="opacity-0 hover:opacity-100 bg-black w-full h-2/4 top-24 absolute">
						<p className="text-center text-white mt-5">Edit</p>
						<input
							onChange={handleAvatar}
							type="file"
							accept="image/*"
							className="p-1 absolute top-0 opacity-0 w-full h-full bg-red-500"
						></input>
					</div>
				</div>
			</div>
			<div className="w-96 h-full mx-auto my-0">
				<form
					onSubmit={handleSubmit(updateData)}
					className="text-center flex flex-col"
				>
					<input
						type="text"
						{...register("name")}
						className="my-4 p-3 rounded outline-none h-10 text-black"
						defaultValue={accDetails.fullName}
					/>
					<input
						type="text"
						{...register("oldPass")}
						className="my-4 p-3 rounded outline-none h-10 text-black"
						placeholder="Old Password"
					/>
					<input
						type="text"
						{...register("newPass")}
						className="my-4 p-3 rounded outline-none h-10 text-black"
						placeholder="New Password"
					/>
					<input
						type="text"
						{...register("newPassV2")}
						className="my-4 p-3 rounded outline-none h-10 text-black"
						placeholder="Confirm Password"
					/>
					<button className="rounded px-4 py-3 bg-black text-white hover:bg-opacity-90 mx-auto my-5">
						Update Profile
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
