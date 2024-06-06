import { useContext } from "react";
import { AuthContext } from "../providers/FirebaseProvider";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuth;
