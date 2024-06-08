import { createBrowserRouter } from "react-router-dom";

import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import Error from "../components/shared/Error";
import AllScholarship from "../pages/all-scholarship/AllScholarship";

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
      {
        path: "all-scholarship",
        element: <AllScholarship />,
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
