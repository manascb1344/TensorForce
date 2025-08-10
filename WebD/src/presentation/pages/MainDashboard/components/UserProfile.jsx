import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { userProfileData } from "../data/dummy";
import { useAppContext } from "../../../providers/AppContextProvider";
import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import svg from "../../../../assets/avatar-svgrepo-com.svg";

const UserProfile = () => {
	const navigate = useNavigate();
	const {
		isClicked,
		setIsClicked,
		handleClick,
	} = useAppContext();
	const { user, logout } = useAuth();
	const { theme } = useTheme();

	const handleLogout = () => {
		logout();
	};

	const renderProfileItems = () => {
		return userProfileData.map((item, index) => (
			<div
				key={index}
				className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer"
				onClick={() => navigate(item.nav)}
			>
				<button
					type="button"
					style={{
						color: item.iconColor,
						backgroundColor: item.iconBg,
					}}
					className="text-xl rounded-lg p-3 hover:bg-light-gray"
				>
					{item.icon}
				</button>
				<div>
					<p className="font-semibold dark:text-gray-200">
						{item.title}
					</p>
					<p className="text-gray-500 text-sm dark:text-gray-400">
						{item.desc}
					</p>
				</div>
			</div>
		));
	};

	return (
		<div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg dark:text-gray-200">
					User Profile
				</p>
				<button
					type="button"
					style={{
						color: "rgb(153, 171, 180)",
						borderRadius: "50%",
						borderColor: "transparent",
						padding: "8px",
					}}
					onClick={() => handleClick("userProfile")}
					className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
				>
					<MdOutlineCancel />
				</button>
			</div>
			<div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
				<img
					className="rounded-full h-20 w-20"
					src={user?.picture || svg}
					referrerPolicy="no-referrer"
					alt="user-profile"
				/>
				<div style={{ maxWidth: "100%", overflow: "hidden" }}>
					<p className="font-semibold text-xl dark:text-gray-200">
						{user?.name || 'User'}
					</p>
					<p className="text-gray-500 text-sm dark:text-gray-400">
						Administrator
					</p>
					<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
						{user?.email || 'user@example.com'}
					</p>
				</div>
			</div>
			<div>{renderProfileItems()}</div>
			<div className="mt-5">
				<button
					type="button"
					onClick={handleLogout}
					style={{
						backgroundColor: theme.color,
						color: "white",
						borderRadius: "10px",
						width: "full",
					}}
					className="p-3 w-full hover:drop-shadow-xl"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
