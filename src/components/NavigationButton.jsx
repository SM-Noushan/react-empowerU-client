import PropTypes from "prop-types";

const NavigationButton = ({ css, children }) => {
  return (
    <button
      type="button"
      className={`text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-primary-800 font-medium rounded-full text-sm p-2.5 text-center ${css}`}
    >
      {children}
    </button>
  );
};

NavigationButton.propTypes = {
  css: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationButton;
