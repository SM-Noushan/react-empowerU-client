import { createBrowserRouter } from "react-router-dom";

import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import Error from "../components/shared/Error";
import PrivateRoute from "../routes/PrivateRoute";
import AllScholarship from "../pages/all-scholarship/AllScholarship";
import ScholarshipDetails from "../pages/scholarship-details/ScholarshipDetails";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../pages/my-profile/MyProfile";

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
      {
        path: "scholarship/:name",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
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
