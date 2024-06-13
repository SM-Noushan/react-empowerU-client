import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/shared/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-dvh flex dark:bg-gray-900">
      <div className="fixed lg:static">
        <Sidebar />
      </div>
      <div className="flex-1 pl-24 pr-6 lg:px-16 xl:px-20 py-5 text-gray-950 dark:text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
