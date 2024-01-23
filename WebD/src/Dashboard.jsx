import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import styles from "./style";
import "./App.css";
import {
  Navbar,
  Footer,
  Sidebar,
  UserProfile,
  Portfolio,
} from "./dashboard_components";
import { useStateContext } from "./contexts/ContextProvider";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const { activeMenu, setActiveMenu } = useStateContext();

  useEffect(() => {
    const sendUserData = async () => {
      if (isAuthenticated && user) {
        const userData = {
          username: user.name,
          email: user.email,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/authenticate",
            userData
          );

          if (response.status === 200) {
            const responseData = response.data;
            console.log("Response data:", responseData);
          } else {
            console.error("Error sending user data");
          }
        } catch (error) {
          console.error(
            "Error sending user data:",
            error.response || error.message || error
          );
        }
      }
    };

    sendUserData();
  }, [isAuthenticated, user]);

  return (
    isAuthenticated && (
      <div className="flex relative bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-secondary-dark-bg">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={`bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed md:static bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            <Portfolio />
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
