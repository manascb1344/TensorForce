import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login from "./Login/Login";
// import Root from "./routes/root";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import { Models, Partner, SentimentAnalysis, Transactions } from "./pages";
import { ContextProvider } from "./contexts/ContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/models",
    element: <Models />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/partner",
    element: <Partner />,
  },
  {
    path: "/sentiment",
    element: <SentimentAnalysis />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Auth0Provider
      domain="dev-ovhg6woj2jzt3u4i.au.auth0.com"
      clientId="IqUZH5W3Y1OP2ueWyUhvC7eaMT0WXbLH"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </ContextProvider>
);
