import { useEffect, useState } from "react";

import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";

import { removeCourseProgress } from "../../../services/operations/courseDetailsAPI";

import { removeCompletedLecture } from "../../../slices/viewCourseSlice";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

import { formatDuration } from "../../../utils/videoDurationFormat";

export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { courseId, sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;

      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);

      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex sm:pb-0 pb-10  sm:h-[calc(100vh-3.5rem)] w-full sm:w-[220px] md:w-[320px] sm:max-w-[350px] flex-col sm:border-r-[1px] border-r-richblack-700 bg-richblack-800">

        <div className=" sm:mr-2 sm:ml-3 mx-8 md:mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`);
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lectures {section?.subSection.length}
                  </span>
                  <span
                    className={`${activeStatus === section?._id
                        ? "rotate-0"
                        : "rotate-180"
                      } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((subSection, i) => (
                    <div
                      className={`flex justify-between px-5 py-2 ${videoBarActive === subSection._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                        );
                        setVideoBarActive(subSection._id);
                      }}
                    >
                      <div className="flex gap-3">
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(subSection?._id)}
                          onChange={async (e) => {
                            setLoading(true);
                            if (!e.target.checked) {
                              const res = await removeCourseProgress(
                                {
                                  courseId: courseId,
                                  subsectionId: subSectionId,
                                },
                                token
                              );
                              if (res) {
                                dispatch(removeCompletedLecture(subSectionId));
                              }
                              setLoading(false);
                            }
                          }}
                          className="cursor-pointer"
                        />
                        {subSection.title}
                      </div>
                      <span>
                        {formatDuration(subSection.timeDuration)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
