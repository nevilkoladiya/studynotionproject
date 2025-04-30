import React from 'react'
import ContinueLearningCard from './ContinueLearning'
import SearchBar from './SearchBar'

import useEnrolledCourses from '../../../hooks/userEnrolledCources'
import useMostPopularCourses from '../../../hooks/useMostPopularCourses'
import useNewlyCreatedCourses from '../../../hooks/useNewlyCreatedCourses'
import useMostSellingCourses from '../../../hooks/useMostSellingCourses'
import useShortCourses from '../../../hooks/useShortCourses'

import CourseSlider from './CourseSlider'

export default function ExploreHome() {
  const { enrolledCourses } = useEnrolledCourses()
  const { mostPopularCourses } = useMostPopularCourses();
  const { newlyCreatedCourses } = useNewlyCreatedCourses();
  const { mostSellingCourses } = useMostSellingCourses();
  const { shortCourses } = useShortCourses();

  return (
    <div className=''>
      <div className="bg-richblack-900 py-10 px-6 text-center text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-4">
          Welcome to <span className="text-yellow-100">StudyNotion</span>
        </h1>
        <p className="text-lg md:text-xl text-richblack-300 max-w-3xl mx-auto mb-6">
          Empower your learning journey with curated courses, expert instructors, and interactive tools.
        </p>
        <p className="text-md text-richblack-400 max-w-2xl mx-auto">
          Whether you're starting fresh or continuing where you left off, StudyNotion is your trusted platform to learn, grow, and succeed.
        </p>
      </div>
      <div className='w-full'>
        <SearchBar/>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-richblack-800 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl ml-8 font-semibold text-yellow-50 mb-2 hover:text-yellow-5 transition-colors duration-300">
          Continue Learning
        </h2>
        <p className="text-lg ml-12 text-richblack-400">
          Keep progressing on your learning journey and unlock new skills every day.
        </p>
        <p className="text-md ml-12 text-richblack-400 mb-4">
          Continue your courses where you left off. Achieve your goals and enhance your expertise.
        </p>

        <div className="bg-richblack-700">
          <div className="w-8/12 p-6 mx-auto">
            <ContinueLearningCard courses={enrolledCourses} />
          </div>
        </div>
      </div>

      {/* Quick Learning Picks */}
      <div className="bg-richblack-800 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl ml-8 font-semibold text-yellow-50 mb-2 hover:text-yellow-5 transition-colors duration-300">
        Quick Learning Picks
        </h2>
        <h3 className='text-lg ml-12 text-slate-50'>
        Learn New skill in Less than 30Minutes!!
        </h3>
        <p className="text-md ml-12 text-richblack-400 mb-4">
        Learn something new in no time! These short, impactful courses are perfect for busy learners who want fast results.
        </p>
        <div className="bg-richblack-700 py-4 px-12 h-auto">
          <CourseSlider
            Courses={
              shortCourses
            }
          />
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="bg-richblack-800 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl ml-8 font-semibold text-yellow-50 mb-2 hover:text-yellow-5 transition-colors duration-300">
          Most Popular Cources
        </h2>
        <p className="text-md ml-12 text-richblack-400 mb-4">
          Explore top courses popular amongs learners like you.
        </p>
        <div className="bg-richblack-700 py-4 px-12 h-auto">
          <CourseSlider
            Courses={
              mostPopularCourses
            }
          />
        </div>
      </div>

      {/* Newly Created Section */}
      <div className="bg-richblack-800 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl ml-8 font-semibold text-yellow-50 mb-2 hover:text-yellow-5 transition-colors duration-300">
          Newly Created
        </h2>
        <p className="text-md ml-12 text-richblack-400">
          Stay Ahead with Fresh Content!
        </p>
        <p className="text-md ml-12 text-richblack-400 mb-4">
          "Explore the Latest Courses Added Just for You!"
        </p>
        <div className="bg-richblack-700 py-4 px-12 h-auto">
          <CourseSlider
            Courses={
              newlyCreatedCourses
            }
          />
        </div>
      </div>

      {/* Frequently Bought Courses Section */}
      <div className="bg-richblack-800 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl ml-8 font-semibold text-yellow-50 mb-2 hover:text-yellow-5 transition-colors duration-300">
          Most Popular Cources
        </h2>
        <p className="text-md ml-12 text-richblack-400 mb-4">
          Explore top courses popular amongs learners like you.
        </p>
        <div className="bg-richblack-700 py-4 px-12 h-auto">
          <CourseSlider
            Courses={
              mostSellingCourses
            }
          />
        </div>
      </div>
    </div>
  )
}
