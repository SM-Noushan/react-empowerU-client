import PropTypes from "prop-types";

const SectionHeading = ({ heading }) => {
  return (
    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        {heading}
      </h2>
    </div>
  );
};

SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default SectionHeading;
