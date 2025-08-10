import React, { useEffect, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAuth } from "../../../../hooks/useAuth.js";
import { useAppContext } from "../../../../providers/AppContextProvider.jsx";
import { useTheme } from "../../../../hooks/useTheme.js";
import svg from "../../../../assets/avatar-svgrepo-com.svg";
import { Cart, UserProfile } from ".";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
	const handleClick = () => {
		if (customFunc) {
			customFunc();
		}
	};
	return (
		<Tippy content={title} placement="bottom">
			<button
				type="button"
				onClick={handleClick}
				style={{ color }}
				className="relative text-xl rounded-full p-3 hover:bg-light-gray"
			>
				<span
					style={{ background: dotColor }}
					className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
				/>
				{icon}
			</button>
		</Tippy>
	);
};

const Navbar = () => {
	const {
		activeMenu,
		setActiveMenu,
		isClicked,
		setIsClicked,
		screenSize,
		setScreenSize,
	} = useAppContext();

	const { user, isLoading } = useAuth();
	const { theme } = useTheme();

	const handleResize = useCallback(() => {
		setScreenSize(window.innerWidth);
	}, [setScreenSize]);

	useEffect(() => {
		const handleResizeCallback = () => {
			handleResize();
		};

		window.addEventListener("resize", handleResizeCallback);

		return () =>
			window.removeEventListener("resize", handleResizeCallback);
	}, [handleResize]);

	useEffect(() => {
		setActiveMenu(screenSize > 900);
	}, [screenSize, setActiveMenu]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div className="flex justify-between p-2 md:mx-6 relative">
			<NavButton
				title="Menu"
				customFunc={() =>
					setActiveMenu((prevActiveMenu) => !prevActiveMenu)
				}
				color={theme.color}
				icon={<AiOutlineMenu />}
			/>
			<div className="flex">
				<Tippy content="Profile" placement="bottom">
					<div
						className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
						onClick={() =>
							setIsClicked((prevState) => ({
								...prevState,
								userProfile: !prevState.userProfile,
							}))
						}
					>
						<img
							className="rounded-full w-8 h-8"
							src={user?.picture || svg}
							referrerPolicy="no-referrer"
							alt="User Avatar"
						/>
						<p>
							<span className="text-gray-400 text-14"> Hi,</span>
							<span className="text-gray-400 font-bold ml-1 text-14">
								{user?.name || 'User'}
							</span>
						</p>
						<MdKeyboardArrowDown className="text-gray-400 text-14" />
					</div>
				</Tippy>
				{isClicked.userProfile && <UserProfile />}
			</div>
		</div>
	);
};

export default Navbar;
