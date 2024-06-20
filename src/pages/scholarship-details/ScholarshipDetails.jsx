import { Blockquote, Rating } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaBook,
  FaBookmark,
  FaCalendarCheck,
  FaMapLocationDot,
  FaMoneyCheck,
} from "react-icons/fa6";

import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import Container2 from "../../components/shared/Container2";
import NavigationButton from "../../components/NavigationButton";
import Review from "../../components/scholarship-details/Review";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const data = useLoaderData() || {};
  const {
    _id,
    scholarshipCategory,
    scholarshipName,
    scholarshipDescription,
    universityLogo,
    universityName,
    scholarshipPostDate,
    universityCity,
    universityCountry,
    applicationDeadline,
    serviceCharge,
    subjectCategory,
    applicationFee,
    reviews,
  } = data;
  const totalRating = reviews.reduce(
    (acc, curr) => (acc = acc + curr.rating),
    0
  );
  const { data: applyStatus, isLoading: applyStatusLoading } = useFetchData(
    `alreadyApplied-${user?.id}`,
    `appliedScholarships/applyStatus/${_id}`,
    {},
    true
  );

  return (
    <Container2>
      <Helmet>
        <title>EmpowerU: {scholarshipName || "Details"}</title>
      </Helmet>
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto space-y-6 flex flex-col justify-center items-center">
            <img
              className="w-full"
              src={universityLogo}
              alt="university-logo"
            />
            <div className="text-sm lg:text-base font-medium tracking-tight text-white dark:text-gray-950 space-x-2.5 w-fit mx-auto">
              <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
                Type: {scholarshipCategory}
              </span>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold  sm:text-2xl">
              {scholarshipName}
            </h1>
            <div className="flex gap-x-12">
              <h3>By {universityName}</h3>
              <h3>Posted On: {scholarshipPostDate}</h3>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p
              className="mb-6 text-gray-500 dark:text-gray-400 text-justify"
              dangerouslySetInnerHTML={{ __html: scholarshipDescription }}
            />

            <div className="py-5 text-gray-900 dark:text-white">
              <ul role="list" className="my-2.5 space-y-4 text-left pl-2">
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <FaBook />
                  <span>Subject: {subjectCategory}</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <FaMapLocationDot />
                  <span>
                    Location: {`${universityCity}, ${universityCountry}`}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <FaMoneyCheck />
                  <span>Application Fess: {applicationFee}$</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <FaMoneyCheck />
                  <span>Service Charge: {serviceCharge}$</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <FaCalendarCheck />
                  <span>Deadline: {applicationDeadline}</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <Rating className="mb-2.5 lg:text-xl">
                    <Rating.Star className="text-gray-900 dark:text-white" />
                    <p className="ml-2 text-sm font-bold">
                      {reviews.length
                        ? (totalRating / reviews.length).toFixed(2)
                        : "None"}
                    </p>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                    <p className="text-sm font-medium text-gray-900 underline dark:text-white">
                      {reviews.length} reviews
                    </p>
                  </Rating>
                </li>
              </ul>
            </div>

            <div className="sm:gap-4 sm:items-center sm:flex">
              <button
                disabled
                title="work in progress"
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:text-gray-900 dark:disabled:text-gray-400"
                role="button"
              >
                <FaBookmark className="mr-2" />
                Bookmark
              </button>

              <Link
                to={
                  applyStatusLoading
                    ? ""
                    : applyStatus?.result
                    ? ""
                    : "/scholarship/apply"
                }
                state={{ data }}
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              >
                {applyStatusLoading
                  ? ""
                  : applyStatus?.result
                  ? "Already Applied"
                  : "Apply Now"}
              </Link>
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="pt-16 relative">
          <h1 className="text-xl font-semibold  sm:text-2xl">
            Student Feedback
          </h1>
          {reviews.length === 0 ? (
            <div className="flex flex-col-reverse items-center justify-center gap-2 h-28">
              <Blockquote>
                <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
                  No Reviews
                </p>
              </Blockquote>
              <Rating>
                <Rating.Star filled={false} />
                <Rating.Star filled={false} />
                <Rating.Star filled={false} />
                <Rating.Star filled={false} />
                <Rating.Star filled={false} />
              </Rating>
            </div>
          ) : (
            <Swiper
              autoplay={{ delay: 3000 }}
              loop={reviews.length > 1 ? true : false}
              navigation={{
                nextEl: ".nextSlideReview",
                prevEl: ".prevSlideReview",
              }}
              modules={[Navigation, Autoplay]}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <Review data={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {/* slide navigate button */}
          {reviews.length > 0 && (
            <div className="inset-0 flex items-center justify-between w-full absolute z-10 h-fit top-1/2 translate-y-1/2 max-w-screen-lg mx-auto">
              <NavigationButton css="prevSlideReview">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavigationButton>
              <NavigationButton css="nextSlideReview">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavigationButton>
            </div>
          )}
        </div>
      </div>
    </Container2>
  );
};

export default ScholarshipDetails;
