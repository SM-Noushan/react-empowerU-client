import { useLocation, useNavigate } from "react-router-dom";

import ProtoTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import MySpinner from "../components/shared/MySpinner";

const AdminOrModRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const { isMod, isModLoading } = useModerator();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading || isAdminLoading || isModLoading) return <MySpinner />;

  if (role === "adminAndMod")
    if (user && (isMod?.role || isAdmin?.role)) return children;
  if (role === "admin") if (user && isAdmin?.role) return children;
  if (role === "mod") if (user && isMod?.role) return children;

  if (user) return navigate(-1);
  return navigate("/signin", {
    state: { from: location },
  });
};

AdminOrModRoute.propTypes = {
  children: ProtoTypes.node.isRequired,
  role: ProtoTypes.string.isRequired,
};

export default AdminOrModRoute;
