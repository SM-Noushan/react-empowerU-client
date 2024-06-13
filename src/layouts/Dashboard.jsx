import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/shared/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-dvh flex dark:bg-gray-900 font-open-sans overflow-y-scroll">
      <div className="fixed bg-black lg:static z-50">
        <Sidebar />
      </div>
      <div className="flex-1 pl-24 pr-6 lg:px-16 xl:px-20 text-gray-950 dark:text-white overflow-y-scroll *:h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
