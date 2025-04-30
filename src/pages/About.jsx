import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponenet from "../components/core/About/State";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactFormSection from "../components/core/About/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center font-inter">
      <section className="bg-richblack-700 w-full">
        <div className="relative w-11/12 max-w-maxContent flex items-center mx-auto flex-col px-0.5">
          <h1 className="text-4xl text-white font-bold text-center mt-20 my-4 lg:w-[60%]">
            Driving Innovation in Online Education for a{" "}
            <HighLightText text={"Brighter Future"} />
          </h1>
          <h2 className="text-richblack-300 text-center sm:mb-36 mb-20 lg:mb-64 lg:w-[66%] text-[17px] font-medium">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </h2>
          <div className="flex w-full absolute sm:-bottom-14 -bottom-10 lg:-bottom-24 justify-between">
            <img className="w-[31.5%]" src={aboutus1} alt="about1" />
            <img src={aboutus2} className="w-[31.5%]" alt="about2" />
            <img src={aboutus3} className="w-[31.5%]" alt="about3" />
          </div>
        </div>
      </section>
      <section className="flex items-center w-11/12 md:mt-20 mt-10 max-w-maxContent text-white pb-16">
        <span className="md:text-4xl text-xl text-white font-bold text-center mt-20 my-4 lg:w-[97%]">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform
          <HighLightText text={"combines technology"} />,
          <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text w-fit">
            {" "}
            expertise
          </span>
          , <span>and community to create an </span>
          <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            unparalleled educational experience.
          </span>
        </span>
      </section>
      <div className="h-[1px] w-full bg-richblack-700"></div>
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      <StatsComponenet />
      <section className=" mx-auto mt-20 flex sm:w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        {/* <ContactFormSection /> */}
      </section>
      {/* <div className="relative mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white"> */}
        {/* Reviws from Other Learner */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1> */}
        {/* <ReviewSlider /> */}
        {/* <ReviewSlider />
      </div> */}
      {/* <Footer /> */}
      <footer className="bg-richblack-800 w-full">
        <Footer/>
      </footer>
    </div>
  );
};

export default About;
