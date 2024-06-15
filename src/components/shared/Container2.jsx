import PropTypes from "prop-types";

const Container2 = ({ children }) => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-[calc(100dvh-368px)] md:min-h-[calc(100dvh-360px)] lg:min-h-[calc(100dvh-378px)] xl:min-h-[calc(100dvh-354px)] antialiased py-8 md:py-16 text-gray-900 dark:text-white">
      {children}
    </section>
  );
};

Container2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container2;
