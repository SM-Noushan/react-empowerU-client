import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import SectionHeading from "../shared/SectionHeading";
import useFetchData from "../../hooks/useFetchData";
import NavigationButton from "../NavigationButton";
import Review from "../scholarship-details/Review";
import Container2 from "../shared/Container2";
import MySpinner from "../shared/MySpinner";

const StudentReview = () => {
  const { data: reviews, isLoading } = useFetchData(
    "featuredReviews",
    "featured/reviews"
  );
  return (
    <Container2>
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <SectionHeading heading="Student Feedback" />
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="mt-6 sm:mt-8 lg:mt-0"></div>
        </div>
        {/* reviews */}
        <div className="pt-16 relative">
          {isLoading ? (
            <MySpinner />
          ) : (
            <>
              <Swiper
                autoplay={{ delay: 3000 }}
                loop={reviews?.length > 1 ? true : false}
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
            </>
          )}
        </div>
      </div>
    </Container2>
  );
};

export default StudentReview;
