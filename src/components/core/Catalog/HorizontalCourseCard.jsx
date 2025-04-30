import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { NavLink } from "react-router-dom";

const HorizontalCourseCard = ({ course, durationArray }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  const totalSeconds = durationArray?.[course._id]?.totalSeconds || 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const formattedDuration =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <NavLink to={`/explore/${course._id}`} className="group w-full flex justify-center">

      <div className="flex flex-col md:flex-row overflow-hidden bg-richblack-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] w-full">

        {/* Image Part */}
        <div className="h-[200px] md:h-full md:w-[300px] border-r-2 border-richblack-700 overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Content Part */}
        <div className="flex flex-col justify-between p-4 flex-grow relative">
          {/* Title and Instructor */}
          <div>
            <p className="text-xl font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition-all">
              {course?.courseName?.length > 60
                ? course?.courseName.substring(0, 60) + "..."
                : course?.courseName}
            </p>
            <p className="text-sm text-richblack-300 mt-2">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <p className="text-xs text-richblack-400 mt-1">
              {formattedDuration}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-yellow-50 text-sm mt-3">
            <span className="font-semibold">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400 text-xs">
              ({course?.ratingAndReviews?.length || 0} Ratings)
            </span>
          </div>

          {/* Price */}
          <div className="absolute top-4 right-4 text-right">
            <p className="text-yellow-50 text-lg font-bold">
              ₹{course?.price}
            </p>
            <p className="text-richblack-400 text-xs line-through">
              ₹{course?.originalPrice || course?.price * 2}
            </p>
          </div>

        </div>

      </div>
    </NavLink>
  );
};

export default HorizontalCourseCard;
