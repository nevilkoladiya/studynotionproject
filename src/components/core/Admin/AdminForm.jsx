import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { sendAdminOtp } from "../../../services/operations/authAPI";
import { setAdminSignupData } from "../../../slices/authSlice";
import { useDispatch } from "react-redux";

const AdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType] = useState(ACCOUNT_TYPE.ADMIN); // default Admin
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };
    // To be used after otp verification
    dispatch(setAdminSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendAdminOtp(formData.email, navigate));

    // Reset form
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2 font-inter">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Create Admin Account</h2>

      <div className="flex flex-col gap-3">
        {/* First and Last Name */}
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="sm:w-1/2">
            <p className="text-richblack-5">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              placeholder="Enter First Name"
              className="w-full mt-2 bg-richblack-700 py-3 px-3 rounded-lg border-b-2 border-richblack-500 text-richblack-5 placeholder-richblack-300 outline-none"
            />
          </label>

          <label className="sm:w-1/2">
            <p className="text-richblack-5">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              placeholder="Enter Last Name"
              className="w-full mt-2 bg-richblack-700 py-3 px-3 rounded-lg border-b-2 border-richblack-500 text-richblack-5 placeholder-richblack-300 outline-none"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="text-richblack-5">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Email Address"
            className="w-full mt-2 bg-richblack-700 py-3 px-3 rounded-lg border-b-2 border-richblack-500 text-richblack-5 placeholder-richblack-300 outline-none"
          />
        </label>

        {/* Password and Confirm Password */}
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="relative sm:w-1/2">
            <p className="text-richblack-5">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              className="w-full mt-2 bg-richblack-700 py-3 px-3 rounded-lg border-b-2 border-richblack-500 text-richblack-5 placeholder-richblack-300 outline-none"
            />
            <span
              className="absolute right-3 top-[48px] text-xl cursor-pointer text-richblack-300"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </label>

          <label className="relative sm:w-1/2">
            <p className="text-richblack-5">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              className="w-full mt-2 bg-richblack-700 py-3 px-3 rounded-lg border-b-2 border-richblack-500 text-richblack-5 placeholder-richblack-300 outline-none"
            />
            <span
              className="absolute right-3 top-[48px] text-xl cursor-pointer text-richblack-300"
              onClick={() => setShowConfirmPass((prev) => !prev)}
            >
              {showConfirmPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-richblack-900 font-medium py-3 my-6 text-lg rounded-lg  transition-all"
      >
        Create Admin Account
      </button>
    </form>
  );
};

export default AdminForm;
