import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Pagination, Navigation } from "swiper/modules";
import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses }) => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      {Courses?.length ? (
        <div className="relative w-full">
          {/* Custom navigation buttons */}

          {Courses.length >= 3 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute z-10 left-[-2rem] top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700"
              >
                &#10094;
              </button>
              <button
                onClick={handleNext}
                className="absolute z-10 right-[-2rem] top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700"
              >
                &#10095;
              </button>
            </>
          )}


          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={25}
            loop={false}
            modules={[FreeMode, Pagination, Navigation]}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mx-4"
          >
            {Courses.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_Card course={course} Height={"h-[150px]"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-xl text-richblack-5 md:pl-0 pl-4">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
