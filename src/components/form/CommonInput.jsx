import { useState } from "react";
import PropTypes from "prop-types";
import { FaCircleExclamation, FaEye, FaEyeSlash } from "react-icons/fa6";

const CommonInput = ({ label, inputType, nameId, error = null }) => {
  const [type, setType] = useState(inputType);
  return (
    <div className="relative">
      <input
        type={type}
        id={nameId}
        aria-describedby={nameId + `ErrorHelp`}
        className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white  focus:outline-none focus:ring-0 peer ${
          error
            ? "border-red-600 dark:border-red-500 focus:border-red-600 dark:focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600"
        }`}
      />
      {error && (
        <p
          id={nameId + `ErrorHelp`}
          className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-x-1.5"
        >
          <span className="font-medium">
            <FaCircleExclamation />
          </span>{" "}
          Some error message.
        </p>
      )}
      {nameId === "password" && (
        <button
          type="button"
          onClick={() => {
            type === "password" ? setType("text") : setType("password");
          }}
          className={`absolute top-4 right-2 text-lg ${
            error
              ? "text-red-600 dark:text-red-500"
              : "text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500"
          }`}
        >
          {type === "password" ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      <label
        htmlFor={nameId}
        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
          error
            ? "text-red-600 dark:text-red-500"
            : "text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

CommonInput.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  nameId: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default CommonInput;
