import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import ScholarshipCard from "../ScholarshipCard";
import NavigationButton from "../NavigationButton";
import SectionHeading from "../shared/SectionHeading";
import { Link } from "react-router-dom";

const TopScholarships = () => {
  return (
    <section className="bg-white dark:bg-gray-900 relative">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <SectionHeading heading="Top Scholarships" />
        <div className="">
          <Swiper
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={{
              nextEl: ".nextSlideTopScholarship",
              prevEl: ".prevSlideTopScholarship",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide> */}
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
            <SwiperSlide>
              <ScholarshipCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* slide navigate button */}
      <div className="inset-0 flex items-center justify-between w-full absolute z-10 h-fit top-1/2 translate-y-1/2 max-w-[1400px] mx-auto">
        <NavigationButton css="prevSlideTopScholarship">
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
        <NavigationButton css="nextSlideTopScholarship">
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
      <div className="w-full text-center relative -mt-4">
        <Link
          to="/all-scholarship"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          See All Scholarship
        </Link>
      </div>
    </section>
  );
};

export default TopScholarships;
