import { Rating } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FaBook,
  FaBookmark,
  FaCalendarCheck,
  FaMapLocationDot,
  FaMoneyCheck,
} from "react-icons/fa6";

import NavigationButton from "../../components/NavigationButton";
import Review from "../../components/scholarship-details/Review";

const ScholarshipDetails = () => {
  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased xl:min-h-[calc(100dvh-353.8px)] text-gray-900 dark:text-white">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto space-y-6">
            <img
              className="w-full"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              alt=""
            />
            <div className="text-sm lg:text-base font-medium tracking-tight text-white dark:text-gray-950 space-x-2.5 w-fit mx-auto">
              <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
                Category
              </span>
              <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
                Category 1
              </span>
              <span className="inline-block bg-gray-700 dark:bg-gray-200 px-2.5 rounded-sm">
                Category 2
              </span>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold  sm:text-2xl">
              Scholarship Name
            </h1>
            <div className="flex gap-x-12">
              <h3>By X University</h3>
              <h3>Posted On: 20 Jun</h3>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Studio quality three mic array for crystal clear calls and voice
              recordings. Six-speaker sound system for a remarkably robust and
              high-quality audio experience. Up to 256GB of ultrafast SSD
              storage.
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
              Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
              Magic Keyboard or Magic Keyboard with Touch ID.
            </p>
            <div className="py-5 text-gray-900 dark:text-white">
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
            </div>

            <div className="sm:gap-4 sm:items-center sm:flex">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <FaBookmark className="mr-2" />
                Bookmark
              </a>

              <a
                href="#"
                title=""
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                role="button"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
        <div className="pt-16 relative">
          <h1 className="text-xl font-semibold  sm:text-2xl">
            Student Feedback
          </h1>
          <Swiper
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={{
              nextEl: ".nextSlideReview",
              prevEl: ".prevSlideReview",
            }}
            modules={[Navigation, Autoplay]}
          >
            <SwiperSlide>
              <Review />
            </SwiperSlide>
            <SwiperSlide>
              <Review />
            </SwiperSlide>
            <SwiperSlide>
              <Review />
            </SwiperSlide>
          </Swiper>
          {/* slide navigate button */}
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
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetails;
