import React from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import frameImage from "../../../assets/Images/frame.png";

const Template = ({ title, des1, des2, formtype, setlogin, image }) => {
  return (
    <div className={`flex md:flex-row md:gap-y-0 md:gap-x-12 gap-y-12 flex-col-reverse md:justify-evenly gap-x-12 mx-auto ${formtype === "login" ? ("mt-16 xl:mt-24") : ("mt-10")} text-white`}>
      <div className="flex flex-col gap-3 w-11/12 max-w-[460px] md:mx-0 mx-auto">
        <h1 className="text-3xl font-semibold font-inter mb-1">{title}</h1>

        <div className="text-richblack-100 text-xl pb-3">
        {des1 && <span>{des1}</span>}
        {des2 && <span className="text-blue-100 italic font-bold text-[18px]">{des2}</span>}
        </div>

        {formtype === "signup" ? (
          <SignUpForm setlogin={setlogin} />
        ) : (
          <LoginForm setlogin={setlogin} />
        )}

      </div>
      <div className="relative w-11/12 max-w-[450px] md:mx-0 mx-auto">
        <img
          src={frameImage}
          alt="frame"
          width={450}
          height={450}
          loading="lazy"
        />

        <img
          src={image}
          className="absolute top-[-10px] right-[10px]"
          alt="Image"
          width={450}
          height={450}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Template;
