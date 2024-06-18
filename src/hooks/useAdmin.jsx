import useAuth from "./useAuth";
import useFetchData from "./useFetchData";

const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useFetchData(
    "isAdmin",
    `role/verify/${user?.uid}?role=admin`,
    {},
    true
  );
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
