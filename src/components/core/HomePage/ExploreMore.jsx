import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore.js";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard.jsx";
const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  function setMyCard(value) {
    setCurrentTab(value);
    console.log(value);
    const result = HomePageExplore.filter((courses) => courses.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }
  return (
    <div className="relative flex flex-col w-full items-center">
      <div className="font-bold text-4xl font-inter">
        Unlock the
        <HighLightText text={"Power of Code"} />
      </div>
      <div className="font-semibold  text-[18px] text-richblack-300 my-5 font-inter lg:my-2">
        Learn to Build Anything You Can Imagine
      </div>
      <div className="lg:hidden h-[900px]"></div>
      <div className="hidden lg:flex z-10 lg:flex-row p-1 mb-52 bg-richblack-800 rounded-full mt-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]  ">
        {tabName.map((element, index) => (
          <div key={index}>
            <div
              className={`${
                currentTab === element
                  ? "bg-richblack-900 text-white"
                  : "bg-transparent text-richblack-300"
              } rounded-full px-7 py-2 font-semibold cursor-pointer transition-all duration-300`}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute lg:-bottom-[350px] lg:top-0 sm:top-[100px] top-[150px] flex lg:flex-row flex-col gap-16 lg:items-center transition-all duration-300 lg:my-0 my-10">
        {courses.map((element, index) => {
          return (
            <div className="lg:w-[30%] sm:w-[55%] w-[80%] lg:mx-0 mx-auto" key={index}>
              <CourseCard
                element={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
