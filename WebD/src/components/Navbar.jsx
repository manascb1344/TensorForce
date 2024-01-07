import { useEffect, useState } from "react";
import { close, logo, menu, star } from "../assets";
import { navLinks } from "../constants";
// import Button from "./Button";
// import { gapi } from "gapi-script";
import Login from "./Login";

const clientID = "712301480142-2n2939q3emacg9uu2534evs1b448f17k.apps.googleusercontent.com";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	// useEffect(() => {
	// 	function start() {
	// 		gapi.client.init({
	// 			clientId: { clientID },
	// 			scope: "",
	// 		});
	// 	}
	// 	gapi.load("client:auth2", start);
	// });

	return (
		<nav className="w-full flex py-6 items-center navbar">
			<img src={logo} alt="HooBank" className="w-[124px] h-[32px]" />

			<ul className="list-none sm:flex hidden items-center flex-1 ml-6">
				{navLinks.map((nav, index) => (
					<li
						key={nav.id}
						className={`font-poppins font-normal cursor-pointer text-[16px] ${
							index === navLinks.length - 1 ? "mr-0" : "mr-10"
						} text-white`}
					>
						<a href={`#${nav.id}`}>{nav.title}</a>
					</li>
				))}
			</ul>

			<Login clientID="712301480142-2n2939q3emacg9uu2534evs1b448f17k.apps.googleusercontent.com" />

			<div className="sm:hidden flex flex-1 justify-end items-center">
				<img
					src={toggle ? close : menu}
					alt="menu"
					className="w-[28px] h-[28px] object-contain"
					onClick={() => setToggle((prev) => !prev)}
				/>

				<div
					className={`${
						toggle ? "flex" : "hidden"
					} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
				>
					<ul className="list-none flex flex-col justify-end items-center flex-1">
						{navLinks.map((nav, index) => (
							<li
								key={nav.id}
								className={`font-poppins font-normal cursor-pointer text-[16px] ${
									index === navLinks.length - 1 ? "mr-0" : "mb-4"
								} text-white`}
							>
								<a href={`#${nav.id}`}>{nav.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
