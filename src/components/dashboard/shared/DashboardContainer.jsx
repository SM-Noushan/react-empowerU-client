import PropTypes from "prop-types";

const DashboardContainer = ({ children }) => {
  return (
    <section className="flex flex-col xl:flex-row justify-center items-center lg:gap-x-12 my-4 lg:my-16 xl:my-0">
      {children}
    </section>
  );
};

DashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardContainer;
