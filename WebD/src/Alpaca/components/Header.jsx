import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name }) => {
	return (
		<>
			<div className="xl:px-32 flex justify-between items-center">
				<div>
					<h1 className="text-5xl">{name}</h1>
					<Search />
				</div>
				<div className="flex items-center space-x-12 ml-64">
					<button className="bg-green-500 text-white px-4 py-2 rounded-md ">Market Buy</button>
					<button className="bg-red-500 text-white px-4 py-2 rounded-md">Market Sell</button>
				</div>
				<ThemeIcon />
			</div>
		</>
	);
};

export default Header;
