import {
  PiArrowLineLeftDuotone,
  PiArrowLineRightDuotone,
} from "react-icons/pi";
import {
  FaArrowRightToBracket,
  FaClipboardUser,
  FaRegPenToSquare,
  FaRegStarHalfStroke,
  FaUser,
} from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

import SidebarItem from "./SidebarItem";
import logo from "../../../../assets/logo.jpg";
import useAuth from "../../../../hooks/useAuth";

const role = "agent";

const userSideBarItem = [
  {
    link: "/dashboard/profile",
    label: "Profile",
    icon: <FaClipboardUser size={20} />,
  },
  {
    link: "/dashboard/applications",
    label: "Applications",
    icon: <FaRegPenToSquare size={20} />,
  },
  {
    link: "/dashboard/reviews",
    label: "Reviews",
    icon: <FaRegStarHalfStroke size={20} />,
  },
];
const agentSideBarItem = [
  {
    link: "/dashboard/profile",
    label: "Profile",
    icon: <FaClipboardUser size={20} />,
  },
  {
    link: "/dashboard/applications",
    label: "Applications",
    icon: <FaRegPenToSquare size={20} />,
  },
  {
    link: "/dashboard/reviews",
    label: "Reviews",
    icon: <FaRegStarHalfStroke size={20} />,
  },
];

const tooltipCSS =
  "absolute z-50 left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(
    window.innerWidth > 768 ? true : false
  );

  const handleSignOut = async () => {
    await logOut();
    toast.success("Sign out successful");
    return navigate("/signin");
  };

  return (
    <>
      <aside className="h-dvh w-fit max-w-72">
        <nav className="h-full flex flex-col bg-white dark:bg-gray-900 border-r dark:border-r-gray-950 shadow-sm">
          {/* website logo */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <Link
              to="/"
              className={`overflow-hidden transition-all duration-1000 ${
                expanded ? "flex items-center w-72" : "w-0 h-8"
              }`}
            >
              <img
                src={logo}
                className="rounded-md mr-3 h-8"
                alt="empoweru-logo"
              />
              <span className="text-lg lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
                EmpowerU
              </span>
            </Link>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <PiArrowLineLeftDuotone size={20} color="#42389D" />
              ) : (
                <PiArrowLineRightDuotone
                  size={20}
                  color="#42389D"
                  className="mr-1"
                />
              )}
            </button>
          </div>
          {/* sidebar menu item */}
          <menu className="mt-6 flex-1 px-3">
            {/* {userSideBarItem.map((item, idx) => (
              <SidebarItem key={idx} details={item} expanded={expanded} />
            ))} */}
            {agentSideBarItem.map((item, idx) => (
              <SidebarItem key={idx} details={item} expanded={expanded} />
            ))}
          </menu>
          {/* dark mode */}
          <div className="border-t dark:border-t-gray-950 flex items-center justify-center px-3 py-3.5 my-1 font-medium rounded-md relative group leading-4 dark:text-white">
            <Flowbite>
              <DarkThemeToggle className="*:size-6 focus:ring-0 p-0" />
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expanded ? "w-52 ml-2 " : "w-0"
                }`}
              >
                <span className="inline-block w-24">Dark Mode</span>
              </div>
              {!expanded && (
                <div className={`${tooltipCSS} w-[90px]`}>Dark Mode</div>
              )}
            </Flowbite>
          </div>
          {/* user info */}
          <div className="border-t dark:border-t-gray-950 flex items-center justify-center p-3 leading-4 dark:text-white relative group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                className="size-10 rounded-full object-cover object-center"
              />
            ) : (
              <FaUser size={20} className="rounded-md" />
            )}
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-500 ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div>
                <h4 className="font-semibold">
                  {user?.displayName || "Anonymous"}
                </h4>
                <span className="text-sm text-gray-600 dark:text-white/80">
                  {user?.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-950"
              >
                <FaArrowRightToBracket />
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
