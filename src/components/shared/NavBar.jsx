import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DarkThemeToggle,
  Avatar,
  Dropdown,
  Navbar,
  Flowbite,
  MegaMenu,
} from "flowbite-react";
import Container from "./Container";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, loading: userStatusLoading, logOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logOut();
    toast.success("Sign out successful");
    return navigate("/signin");
  };

  return (
    <Container>
      <Navbar className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center dark:bg-gray-900">
        <Link to="/" className="flex items-center">
          <img
            src="./assets/logo.jpg"
            className="rounded-md mr-3 h-8 sm:h-10"
            alt="empoweru-logo"
          />
          <span className="self-center text-xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white">
            EmpowerU
          </span>
        </Link>
        {/* search */}
        <form className="hidden lg:block max-w-md mx-auto flex-1">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-primary-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search Scholarship"
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end">
          <Flowbite>
            <DarkThemeToggle className="*:size-8 focus:ring-0" />
          </Flowbite>

          {userStatusLoading ? (
            <div role="status" className="animate-pulse p-2.5">
              <div className="size-8 bg-gray-300 rounded-full dark:bg-gray-700" />
            </div>
          ) : user ? (
            <Dropdown
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
              arrowIcon={false}
              inline
              label={
                <Avatar
                  className="w-14 *:*:size-8 *:*:rounded-full *:hover:bg-gray-200 *:dark:hover:bg-gray-700 *:p-2.5 *:rounded-lg object-cover object-center"
                  alt="user-avatar"
                  img={user?.photoURL}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.displayName || "Hello,"}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email || ""}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link
              to="/signin"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 *:size-8 rounded-lg p-2.5"
            >
              <FaRegCircleUser />
            </Link>
          )}

          <MegaMenu.DropdownToggle className="inline-flex items-center ml-2.5 p-2.5 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open main menu</span>
            <FaBars className="size-6 md:size-8" />
          </MegaMenu.DropdownToggle>
        </div>
        <MegaMenu.Dropdown className="hidden justify-between items-center w-full text-right">
          <ul className="flex flex-col mt-4 font-medium gap-y-1.5">
            <li>
              <NavLink
                to="/"
                className="block pr-1.5 rounded bg-transparent text-primary-700 lg:p-0 dark:text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-scholarship"
                className="block pr-1.5 rounded bg-transparent text-primary-700 lg:p-0 dark:text-white"
              >
                All Scholarship
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="block pr-1.5 rounded bg-transparent text-primary-700 lg:p-0 dark:text-white"
              >
                Dashboard
              </NavLink>
            </li>
            {!user && (
              <li className="flex items-center justify-end gap-2 w-full">
                <Link
                  to="/signin"
                  className="text-gray-800 dark:text-white border-2 border-primary-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </MegaMenu.Dropdown>
      </Navbar>
    </Container>
  );
};

export default NavBar;
