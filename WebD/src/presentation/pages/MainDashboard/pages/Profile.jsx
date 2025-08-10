import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { Button } from "../components";
import { userProfileData } from "../data/dummy";
import { coversvg } from "../../../../assets/index.js";

const UserProfile = () => {
	const { currentColor } = useStateContext();
	const { user } = useAuth0();
	const [editable, setEditable] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: user?.name || "User",
		email: user?.email || "user@example.com",
		role: "Developer",
		verified: true,
		about: "I am a passionate developer with expertise in React and modern web technologies.",
	});

	const handleEdit = () => {
		setEditable(true);
	};

	const handleSave = () => {
		setEditable(false);
		// Here you would typically save the data to your backend
	};

	const handleCancel = () => {
		setEditable(false);
		// Reset to original values
		setUserInfo({
			name: user?.name || "User",
			email: user?.email || "user@example.com",
			role: "Developer",
			verified: true,
			about: "I am a passionate developer with expertise in React and modern web technologies.",
		});
	};

	return (
		<div className="flex gap-10 flex-wrap justify-center">
			<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
				<div className="flex items-center justify-between">
					<p className="font-semibold text-lg">User Profile</p>
					<div className="flex items-center gap-4">
						<p className="text-lg font-semibold"> 97% </p>
					</div>
				</div>
				<div className="flex gap-4 items-center">
					<img
						className="rounded-full h-24 w-24"
						src={user?.picture}
						alt="user-profile"
					/>
					<div>
						<p className="font-semibold text-xl"> {userInfo.name} </p>
						<p className="text-gray-500 text-sm dark:text-gray-400">
							{" "}
							{userInfo.role}{" "}
						</p>
						<p className="text-gray-500 text-sm dark:text-gray-400">
							{" "}
							{userInfo.email}{" "}
						</p>
					</div>
				</div>
				<div className="flex gap-10 flex-wrap justify-center">
					<div className="flex-1 border-r-1 border-color pr-10">
						<div>
							<p>
								<span className="font-semibold text-lg">
									{userProfileData.data[0].title}
								</span>
								<p className="text-gray-600 dark:text-gray-400">
									{userProfileData.data[0].desc}
								</p>
							</p>
						</div>
						<div>
							<p>
								<span className="font-semibold text-lg">
									{userProfileData.data[1].title}
								</span>
								<p className="text-gray-600 dark:text-gray-400">
									{userProfileData.data[1].desc}
								</p>
							</p>
						</div>
						<div>
							<p>
								<span className="font-semibold text-lg">
									{userProfileData.data[2].title}
								</span>
								<p className="text-gray-600 dark:text-gray-400">
									{userProfileData.data[2].desc}
								</p>
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-1">
							{userProfileData.socials.map((social) => (
								<div
									key={social.name}
									className="w-10 h-10 cursor-pointer rounded-full"
									style={{ backgroundColor: social.color }}
								>
									<img
										src={social.icon}
										alt={social.name}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-400">
				<div className="flex justify-between items-center">
					<p className="font-semibold text-lg">Profile Information</p>
					{!editable ? (
						<button
							onClick={handleEdit}
							style={{ color: currentColor }}
							className="text-2xl rounded-lg p-1 hover:bg-light-gray"
						>
							<MdOutlineEdit />
						</button>
					) : (
						<div className="flex gap-2">
							<button
								onClick={handleSave}
								style={{ color: currentColor }}
								className="text-2xl rounded-lg p-1 hover:bg-light-gray"
							>
								<BsCheck />
							</button>
							<button
								onClick={handleCancel}
								style={{ color: currentColor }}
								className="text-2xl rounded-lg p-1 hover:bg-light-gray"
							>
								<MdOutlineCancel />
							</button>
						</div>
					)}
				</div>
				<div className="flex gap-10 flex-wrap justify-center">
					<div className="flex-1 border-r-1 border-color pr-10">
						<div>
							<p>
								<span className="font-semibold text-lg">Name</span>
								{editable ? (
									<input
										type="text"
										value={userInfo.name}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												name: e.target.value,
											})
										}
										className="w-full p-2 border rounded-lg dark:bg-secondary-dark-bg dark:text-gray-200"
									/>
								) : (
									<p className="text-gray-600 dark:text-gray-400">
										{userInfo.name}
									</p>
								)}
							</p>
						</div>
						<div>
							<p>
								<span className="font-semibold text-lg">Email</span>
								{editable ? (
									<input
										type="email"
										value={userInfo.email}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												email: e.target.value,
											})
										}
										className="w-full p-2 border rounded-lg dark:bg-secondary-dark-bg dark:text-gray-200"
									/>
								) : (
									<p className="text-gray-600 dark:text-gray-400">
										{userInfo.email}
									</p>
								)}
							</p>
						</div>
						<div>
							<p>
								<span className="font-semibold text-lg">Role</span>
								{editable ? (
									<input
										type="text"
										value={userInfo.role}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												role: e.target.value,
											})
										}
										className="w-full p-2 border rounded-lg dark:bg-secondary-dark-bg dark:text-gray-200"
									/>
								) : (
									<p className="text-gray-600 dark:text-gray-400">
										{userInfo.role}
									</p>
								)}
							</p>
						</div>
						<div>
							<p>
								<span className="font-semibold text-lg">About</span>
								{editable ? (
									<textarea
										value={userInfo.about}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												about: e.target.value,
											})
										}
										className="w-full p-2 border rounded-lg dark:bg-secondary-dark-bg dark:text-gray-200"
										rows="3"
									/>
								) : (
									<p className="text-gray-600 dark:text-gray-400">
										{userInfo.about}
									</p>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
