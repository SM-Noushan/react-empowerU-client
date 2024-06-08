import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="bg-white border-gray-200 px-4 lg:px-12 xl:px-20 py-2.5 dark:bg-gray-900">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
