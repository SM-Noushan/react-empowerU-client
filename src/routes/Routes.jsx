import { createBrowserRouter } from "react-router-dom";

import Main from "../layouts/Main";
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import Dashboard from "../layouts/Dashboard";
import Error from "../components/shared/Error";
import AdminOrModRoute from "./AdminOrModRoute";
import PrivateRoute from "../routes/PrivateRoute";
import CheckOut from "../pages/checkout/CheckOut";
import MyProfile from "../pages/my-profile/MyProfile";
import MyReviews from "../pages/my-reviews/MyReviews";
import MyApplications from "../pages/applications/MyApplications";
import AllScholarship from "../pages/all-scholarship/AllScholarship";
import AddScholarship from "../pages/add-scholarships/AddScholarship";
import ScholarshipDetails from "../pages/scholarship-details/ScholarshipDetails";
import ManageScholarships from "../pages/manage-scholarships/ManageScholarships";

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
        path: "scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/scholarship/${params.id}`),
      },
      {
        path: "scholarship/apply",
        element: (
          <PrivateRoute>
            <CheckOut />
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
      // user
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "applications",
        element: <MyApplications />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },

      // admin and mod
      {
        path: "scholarship/add",
        element: (
          <AdminOrModRoute role="adminAndMod">
            <AddScholarship />
          </AdminOrModRoute>
        ),
      },
      {
        path: "scholarships",
        element: (
          <AdminOrModRoute role="adminAndMod">
            <ManageScholarships />
          </AdminOrModRoute>
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
