import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./UserProfile";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2">
      {icon}
    </span>
  </button>
);

const Navbar = () => {
  const { user } = useAuth0();
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const renderProfileButton = () => {
    if (true) {
      return (
        <div
          className="relative ml-auto flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-1g"
          onClick={() => handleClick("userProfile")}
        >
          <img
            id="avatarButton"
            type="button"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={user.picture}
            alt="User dropdown"
          />
          <p>
            <span className="text-gray-400 text-14">Hi, </span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              {user.name}
            </span>
          </p>
          <ArrowDropDownIcon />
        </div>
      );
    } else {
      return <Button onClick={handleLogin} label="Login" styles="ml-auto" />;
    }
  };

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="#03C9D7"
        icon={<MenuIcon />}
      />
      {renderProfileButton()}
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
};

export default Navbar;
