import {
  FaBook,
  FaCalendarCheck,
  FaMapLocationDot,
  FaMoneyCheck,
} from "react-icons/fa6";
import { Rating } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ScholarshipCard = ({ data }) => {
  const {
    _id,
    scholarshipCategory,
    scholarshipName,
    universityLogo,
    universityName,
    universityCity,
    universityCountry,
    applicationDeadline,
    subjectCategory,
    applicationFee,
  } = data; //todo rating
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-8 pt-8">
        <img
          className="rounded-t-lg mb-2.5 w-full h-52 object-contain"
          src={universityLogo}
          alt="university-logo"
        />
        <div className="text-sm lg:text-base font-medium tracking-tight text-white dark:text-gray-950 space-x-2.5">
          <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
            {scholarshipCategory}
          </span>
        </div>
      </div>
      <div className="px-5 py-5 text-gray-900 dark:text-white">
        <h5 className="text-2xl font-semibold tracking-tight">
          {scholarshipName} <br />
          <span className="text-sm lg:text-base font-medium">
            By {universityName}
          </span>
        </h5>

        <ul role="list" className="my-2.5 space-y-4 text-left pl-2">
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaMapLocationDot />
            <span>
              Location: {universityCity}, {universityCountry}
            </span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaCalendarCheck />
            <span>Deadline: {applicationDeadline}</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaMoneyCheck />
            <span>Fess: {applicationFee}$</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaBook />
            <span>Subject: {subjectCategory}</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <Rating className="mb-2.5 lg:text-xl">
              <Rating.Star />
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                4.95
              </p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              <p className="text-sm font-medium text-gray-900 underline dark:text-white">
                73 reviews
              </p>
            </Rating>
          </li>
        </ul>

        <button
          onClick={() => navigate(`/scholarship/${_id}`)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

ScholarshipCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ScholarshipCard;
