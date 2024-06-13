import PropTypes from "prop-types";
import { FaCircleExclamation } from "react-icons/fa6";

const DatePicker = ({ children, name, label, error = null }) => {
  return (
    <div className="relative">
      <label
        className={`block mb-2 text-sm font-medium ${
          error
            ? "text-red-600 dark:text-red-500"
            : "text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      {children}

      {error && (
        <p
          id={name + `ErrorHelp`}
          className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-x-1.5"
        >
          <span className="font-medium">
            <FaCircleExclamation />
          </span>
          {error}
        </p>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default DatePicker;
