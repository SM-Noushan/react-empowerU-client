import {
  FaBook,
  FaCalendarCheck,
  FaMapLocationDot,
  FaMoneyCheck,
} from "react-icons/fa6";
import { Rating } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ScholarshipCard = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-8 pt-8">
        <img
          className="rounded-t-lg mb-2.5"
          src="https://th.bing.com/th/id/R.60e53391a03b165c9b7aee0a73817696?rik=q7CyGyhp%2b7znEw&pid=ImgRaw&r=0"
          alt="product image"
        />
        <div className="text-sm lg:text-base font-medium tracking-tight text-white dark:text-gray-950 space-x-2.5">
          <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
            Category 1
          </span>
          <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
            Category 2
          </span>
        </div>
      </div>
      <div className="px-5 py-5 text-gray-900 dark:text-white">
        <h5 className="text-xl lg:text-3xl font-semibold tracking-tight">
          University Name
        </h5>

        <ul role="list" className="my-2.5 space-y-4 text-left pl-2">
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaMapLocationDot />
            <span>Location: Kuril, 20</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaCalendarCheck />
            <span>Deadline: 20 March, 2020</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaMoneyCheck />
            <span>Fess: 1200$</span>
          </li>
          <li className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <FaBook />
            <span>Subject: Science</span>
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
          onClick={() => navigate(`/scholarship/name`)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ScholarshipCard;
