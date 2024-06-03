import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BannerSlide = ({ data = {} }) => {
  const { heading, description, image } = data;
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col-reverse gap-6 lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="lg:mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          {heading}
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-justify dark:text-gray-400">
          {description}
        </p>
        <div className="w-full text-right lg:text-start">
          <Link
            to="/all-scholarship"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            All Scholarship
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src={image}
          alt="banner-image"
          className="rounded-md object-cover object-center w-full lg:w-[368px] xl:w-[640px] h-48 md:h-96 lg:h-80 xl:h-96"
        />
      </div>
    </div>
  );
};

BannerSlide.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BannerSlide;
