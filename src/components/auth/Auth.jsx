import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import FileInput from "../form/FileInput";
import useAuth from "../../hooks/useAuth";
import CommonInput from "../form/CommonInput";
import { FaCircleNotch } from "react-icons/fa6";

const Auth = ({ role }) => {
  const { loading, setLoading, createUserWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSocialSignIn = async () => {
    try {
      await createUserWithGoogle();
      toast.success("Signin successful");
      navigate(location?.state ? location.state : "/");
    } catch (e) {
      setLoading(false);
      toast.error("Error! Try again.");
    }
  };
  return (
    <section className="bg-[url('https://i.ibb.co/HVtsYMN/empoweru-auth-light.jpg')] dark:bg-[url('https://i.ibb.co/K5Bx01T/empoweru-auth-dark.jpg')] bg-cover bg-center bg-no-repeat">
      <Helmet>
        <title>EmpowerU: {role === "signin" ? "Sign in" : "Sign up"}</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 mx-auto min-h-dvh">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Link
            to="/"
            className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pt-8"
          >
            <img
              src="./assets/logo.jpg"
              className="rounded-md mr-3 h-8 sm:h-10"
              alt="empoweru-logo"
            />
            <span className="self-center text-xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white">
              EmpowerU
            </span>
          </Link>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <button
              disabled={loading}
              onClick={handleSocialSignIn}
              type="button"
              className="inline-flex items-center justify-center mb-2 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-600 dark:disabled:bg-primary-600"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign {role === "signin" ? "in" : "up"} with Google
              {loading && <FaCircleNotch className="ml-2.5 animate-spin" />}
            </button>
            <div className="flex justify-between items-center gap-x-4">
              <hr className="border-gray-300 border-2 border-dotted flex-1" />
              <span className="text-lg font-medium leading-tight tracking-tight text-gray-900 dark:text-white">
                OR
              </span>
              <hr className="border-gray-300 border-2 border-dotted flex-1" />
            </div>
            {role === "signup" && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
            )}
            <form className="space-y-4 md:space-y-6" action="#">
              <CommonInput label="Name" inputType="text" nameId="name" />
              {role === "signup" && (
                <CommonInput label="Email" inputType="email" nameId="email" />
              )}
              <CommonInput
                label="Password"
                inputType="password"
                nameId="password"
              />
              {role === "signup" && (
                <FileInput label="Profile Picture" nameId="profileImage" />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-600 dark:disabled:bg-primary-600 flex items-center justify-center gap-x-2"
              >
                {role === "signin" ? "Sign In" : "Sign Up"}
                {loading && <FaCircleNotch className="animate-spin" />}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={role === "signin" ? "/signup" : "/signin"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {role === "signin" ? "Sign up here" : "Sign in here"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Auth.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Auth;
