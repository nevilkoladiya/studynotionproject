import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { NavLink } from "react-router-dom";

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  // Convert duration in seconds to mm:ss format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <NavLink to={`/explore/${course._id}`} className="group">
      <div className="flex flex-col rounded-lg overflow-hidden bg-richblack-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
        
        {/* Image Part */}
        <div className="h-[200px] w-full overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Part */}
        <div className="h-[200px] flex flex-col justify-evenly flex-grow p-4">
          
          {/* Course Title + Instructor */}
          <div>
            <p className="text-lg font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition-all">
              {course?.courseName?.length > 50 
                ? course?.courseName.substring(0, 50) + "..."
                : course?.courseName}
            </p>
            <p className="text-sm text-richblack-300 mt-1">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Show duration if it exists (even if zero) */}
            {typeof course?.totalDuration === "number" && (
              <p className="text-xs text-richblack-400 mt-1">
                Duration: {formatDuration(course.totalDuration)}
              </p>
            )}
          </div>

          {/* Rating and Price */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2 text-yellow-50 text-sm">
              <span className="font-medium">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                ({course?.ratingAndReviews?.length} Ratings)
              </span>
            </div>
            <p className="text-xl font-bold text-yellow-50 mt-2">
              Rs. {course?.price}
            </p>
          </div>

        </div>
      </div>
    </NavLink>
  );
};

export default Course_Card;
