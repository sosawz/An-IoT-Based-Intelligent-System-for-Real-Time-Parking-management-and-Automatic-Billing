// import { exact } from "prop-types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Login = lazy(() => import("../views/Login.js"));
const Register = lazy(() => import("../views/Register.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Admin = lazy(() => import("../views/Admin.js"));
const About = lazy(() => import("../views/About.js"));
const Payment = lazy(() => import("../views/Payment.js"));
const UserCars = lazy(() => import("../views/UserCars.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> }, // เปลี่ยนจาก "/starter" เป็น "/login"
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/admin", exact: true, element: <Admin /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/payment", exact: true, element: <Payment /> },
      { path: "/usercars", exact: true, element: <UserCars /> },
    ],
  },
];

export default ThemeRoutes;
