import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Error from "../components/shared/Error";
// import SignIn from "../components/auth/SignIn";
// import SignUp from "../components/auth/SignUp";
import Auth from "../components/auth/Auth";
import SignUp from "../components/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Auth role="signin" />,
  },
  {
    path: "/signup",
    element: <Auth role="signup" />,
  },
]);
