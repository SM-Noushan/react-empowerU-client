import { Navigate, useLocation } from "react-router-dom";
import ProtoTypes from "prop-types";

import useAuth from "../hooks/useAuth";
import MySpinner from "../components/shared/MySpinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <MySpinner />;
  if (user) return children;
  return <Navigate state={{ from: location }} to="/signin"></Navigate>;
};

PrivateRoutes.propTypes = {
  children: ProtoTypes.node.isRequired,
};

export default PrivateRoutes;
