import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import axios from "axios";

import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import BannerSlide from "./BannerSlide";
import Container from "../shared/Container";

const Banner = () => {
  const [bannerInfo, setBannerInfo] = useState(null);
  useEffect(() => {
    axios.get("/data/banner.json").then((res) => setBannerInfo(res.data));
  }, []);
  return (
    <Container>
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center relative">
        {bannerInfo?.length > 0 && (
          <Swiper
            direction={"vertical"}
            autoplay={{ delay: 3000 }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".nextSlide",
              prevEl: ".prevSlide",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full rounded-md max-h-[434px] md:max-h-[600px] lg:max-h-[432px] xl:max-h-[496px]"
          >
            {bannerInfo.map((data, idx) => (
              <SwiperSlide key={idx}>
                <BannerSlide data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* slide navigate button */}
        <div className="hidden lg:flex flex-col gap-y-2 absolute top-1/2 -translate-y-1/2 lg:-left-12 xl:-left-16 z-10">
          <button
            type="button"
            className="prevSlide text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-primary-800 font-medium rounded-full text-sm p-2.5 text-center me-2 mb-2"
          >
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
                d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="nextSlide text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-primary-800 font-medium rounded-full text-sm p-2.5 text-center me-2 mb-2"
          >
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
                d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
