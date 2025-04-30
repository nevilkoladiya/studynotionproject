import React from "react";
import ReachUs from "../components/core/Contact/ReachUs";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const ContactUs = () => {
  return (
    <>
      <div className="font-inter w-11/12 mx-auto gap-10 items-start my-20 max-w-maxContent flex lg:flex-row flex-col text-base text-richblack-200">
        <div className="w-full lg:w-[38%]">
          <ReachUs />
        </div>
        <div className="w-full lg:w-[59%] p-8 md:p-12 border-[0.1px] border-richblack-600 rounded-xl">
          <p className="text-4xl w-[90%] text-white font-inter mb-3 font-semibold">
            Got a Idea? We've got the skills. Let's team up
          </p>
          <p className="font-inter text-richblack-300 mb-10">
            Tell us more about yourself and what you're got in mind.
          </p>
          <ContactUsForm />
        </div>
      </div>
      {/* <div className="relative mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white"> */}
        {/* Reviws from Other Learner */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1> */}
        {/* <ReviewSlider /> */}
        {/* <ReviewSlider/>
      </div> */}
      {/* {footer} */}
      <footer className="bg-richblack-800 w-full">
        <Footer />
      </footer>
    </>
  );
};

export default ContactUs;
