import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;

  const [showPass, setShowPass] = useState(false);

  function changeHandler(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 font-inter">
      <label>
        <p>
          Email Address<sup className="text-pink-200 ml-1">*</sup>
        </p>
        <input
          className="w-full bg-richblack-700 mt-2 py-3 px-2 outline-none rounded-lg border-b-[2px] text-richblack-5 placeholder-richblack-300 border-richblack-500 "
          required
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="Enter Email Address"
        />
      </label>

      <label className="relative ">
        <p>
          Password<sup className="text-pink-200 ml-1">*</sup>
        </p>

        <input
          className="w-full bg-richblack-700 mt-2 py-3 px-2 outline-none rounded-lg border-b-[2px] text-richblack-5 placeholder-richblack-300 border-richblack-500 "
          required
          type={showPass ? "text" : "password"}
          name="password"
          value={password}
          onChange={changeHandler}
          placeholder="Enter Your Password"
        />

        <span
          className="absolute text-2xl right-2 top-[46px]"
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
        >
          {!showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>

        <Link to="/forgot-password">
          <p className="absolute  right-0 text-xs text-blue-100 mt-1">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="w-full bg-yellow-50 leading-[26px] font-medium py-2 my-6 font-inter text-black text-[17px] rounded-xl"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
