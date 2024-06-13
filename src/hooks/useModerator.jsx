import useAuth from "./useAuth";
import useFetchData from "./useFetchData";

const useModerator = () => {
  const { user } = useAuth();
  const { data: isMod, isLoading: isModLoading } = useFetchData(
    "isMod",
    `role/verify/${user?.uid}?role=moderator`,
    {},
    true
  );
  return { isMod, isModLoading };
};

export default useModerator;
