import PropTypes from "prop-types";
import { forwardRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const TextAreaInput = forwardRef(function TextAreaInput(
  { onChange, onBlur, name, label, error = null },
  ref
) {
  return (
    <div className="relative">
      {/* <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        disabled={disable}
        step={name === "universityWorldRank" ? 1 : 0.01}
        
        className={`block  border-0 border-b-2  `}
      /> */}

      <textarea
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        aria-describedby={name + `ErrorHelp`}
        rows="4"
        className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700  appearance-none dark:text-white focus:outline-none focus:ring-0 peer  border-0 border-b-2 dark:placeholder-gray-400 placeholder:pt-3.5 placeholder:text-base focus:placeholder:pt-0 ${
          error
            ? "border-red-600 dark:border-red-500 focus:border-red-600 dark:focus:border-red-500 placeholder:text-red-600"
            : "border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600"
        }`}
        placeholder="Write here..."
      />

      {error && (
        <p
          id={name + `ErrorHelp`}
          className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-x-1.5"
        >
          <span className="font-medium">
            <FaCircleExclamation />
          </span>{" "}
          {error}
        </p>
      )}

      <label
        htmlFor={name}
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
});

TextAreaInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default TextAreaInput;
