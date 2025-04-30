import React from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from "react-router-dom"

export default function ContinueLearningCard({ courses }) {
  const navigate = useNavigate()

  if (!courses) {
    return <div className="spinner mx-auto"></div>
  }

  if (courses.length === 0) {
    return (
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
        You haven't enrolled in any courses yet.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {courses.map((course) => {
        const progress = Math.floor(course.progressPercentage || 0); // Use Math.floor to round down the progress
        return (
          <div
            key={course._id}
            className="bg-richblack-800 p-4 rounded-lg border border-richblack-700 shadow-md"
          >
            <div
              className="flex gap-4 cursor-pointer"
              onClick={() =>
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }
            >
              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt="course thumbnail"
                className="h-20 w-32 object-cover rounded-md"
              />

              {/* Content */}
              <div className="flex flex-col justify-between w-full">
                <h3 className="text-lg font-semibold text-richblack-5">
                  {course.courseName}
                </h3>
                <p className="text-sm text-richblack-300">
                  {course.courseDescription.slice(0, 60)}...
                </p>
                <p className="text-xs text-richblack-400 mt-1">
                  Duration: {course?.totalDuration}
                </p>

                {/* Progress Bar with text on the right */}
                <div className="mt-2 flex items-center gap-2 w-full max-w-xs">
                  <ProgressBar
                    completed={progress}
                    height="8px"
                    isLabelVisible={false}
                    baseBgColor="#1a1a1a"
                    bgColor="#FFD60A"
                    className="w-full"
                  />
                  <span className="text-xs text-richblack-300 whitespace-nowrap">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
