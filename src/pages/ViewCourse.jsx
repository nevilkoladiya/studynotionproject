import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {

  const { courseId } = useParams();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [burger, setburger] = useState(true);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBurger() {
    setburger(!burger);
  }
  function handleOutsideBurger() {
    if (burger) {
      setburger(!burger);
    }
  }

  return (
    <div className="relative top-14">
      <div className="relative flex sm:flex-row flex-col min-h-[calc(100vh-3.5rem)]">

        <div className="flex sm:hidden flex-row justify-between items-center bg-richblack-800 border-b-[1px] border-b-richblack-700">
          <RxHamburgerMenu
            className="text-white z-10 m-2 w-[20px] h-[20px] "
            onClick={handleBurger}
          />
          {burger ? (
            <RxCross1
              className="text-white z-10 m-2 w-[15px] h-[15px] "
              onClick={handleBurger}
            />
          ) : (
            ""
          )}
          {!burger ? (
            <IoIosArrowDown
              className="text-white z-10 m-2 w-[15px] h-[15px] "
              onClick={handleBurger}
            />
          ) : (
            ""
          )}
        </div>

        <div className={`${burger ? "block" : "sm:block hidden"}`}>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className="sm:h-[calc(100vh-3.5rem)] flex-1 overflow-auto" onClick={handleOutsideBurger}>
          <div className="w-10/12 mx-auto pt-5">
            <Outlet />
          </div>
        </div>
        
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}
