import PropTypes from "prop-types";
import { FaCircleExclamation } from "react-icons/fa6";

const FileInput = ({ label, nameId, error = null }) => {
  return (
    <div className="relative">
      <label
        className={`block mb-2 text-sm font-medium ${
          error
            ? "text-red-600 dark:text-red-500"
            : "text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500"
        }`}
        htmlFor={nameId}
      >
        {label}
      </label>
      <input
        type="file"
        id={nameId}
        aria-describedby={nameId + `ErrorHelp`}
        className={`block rounded-lg px-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 dark:text-white  focus:outline-none focus:ring-0 peer ${
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
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  nameId: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FileInput;
