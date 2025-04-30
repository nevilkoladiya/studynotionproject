import React from "react";
import Footer2 from "./Footer2";
import { FooterLink2 } from "../../data/footer-links.js";
import { NavLink } from "react-router-dom";
import Footer1 from "./Footer1.jsx";

const Footer = () => {
  return (
    <div>
      <div className="pt-14 mb-6 flex lg:flex-row lg:items-start items-center flex-col justify-between w-11/12 max-w-maxContent mx-auto  ">
        <div className="lg:w-[50%] w-[90%] max-w-maxContent mb-5 lg:mb-0">
          <Footer1 />
        </div>
        <div className="lg:w-[50%] w-[90%] lg:border-t-[0px] border-t-[0.1px] lg:pt-0 pt-5 lg:mt-0 lg:border-l-[0.1px] pb-5 border-richblack-700 max-w-maxContent lg:px-5 flex flex-wrap sm:flex-row  lg:gap-20 gap-8 font-inter">
          {FooterLink2.map((item, index) => (
            <Footer2 key={index} title={item.title} links={item.links} />
          ))}
        </div>
      </div>
      <div className="border-b-[0.2px] border-richblack-700 w-[86%] mx-auto"></div>
      <div className="py-6 text-[15px] w-[90%] lg:w-[84%] mx-auto text-richblack-400 text-base font-inter flex sm:flex-row flex-col justify-between">
        <div className="flex sm:flex-row flex-col">
          <NavLink
            className="border-richblack-700 hover:text-richblack-50 border-b-[0.2px] sm:py-0 py-2 sm:text-start text-center sm:border-b-0 sm:border-r-[0.2px] px-3"
            to="privacy-policy"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            className="px-3 sm:text-start text-center sm:py-0 py-2 pb-5 hover:text-richblack-50"
            to="terms"
          >
            Terms
          </NavLink>
        </div>
        <div className="text-center text-[15px]">
          Made by SS © 2025 Studynotion
        </div>
      </div>
    </div>
  );
};

export default Footer;
