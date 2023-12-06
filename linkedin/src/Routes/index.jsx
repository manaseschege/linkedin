import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import HomeLayout from "../layouts/HomeLayout";

import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import Topbar from "../components/common/Topbar";
import HomeComponent from "../components/HomeComponent";

import Profile from "../Pages/Profile";
import Connections from "../Pages/Connections";
import MainLayout from "../layouts/Layout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <HomeComponent />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
    ],
  },
]);
