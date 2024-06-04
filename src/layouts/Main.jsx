import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import FooTer from "../components/shared/FooTer";

const Main = () => {
  return (
    <div className="font-open-sans">
      <NavBar />
      <Outlet />
      <FooTer />
    </div>
  );
};

export default Main;
