import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import CommonInput from "../form/CommonInput";
import FileInput from "../form/FileInput";

const Auth = ({ role }) => {
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
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {role === "signin" ? "Sign In" : "Sign Up"}
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
