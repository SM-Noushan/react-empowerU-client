import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import FooTer from "../components/shared/FooTer";

import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

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
