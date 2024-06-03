import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";

const Main = () => {
  return (
    <div className="font-open-sans">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
