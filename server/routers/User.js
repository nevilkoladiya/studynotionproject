// Import the required modules
import express from "express";
const router = express.Router();

export default router;

import { login, signUp, sendOTP, changePassword } from "../controllers/Auth.js";
import {
  resetPassword,
  resetPasswordToken,
} from "../controllers/ResetPassword.js";
import { auth, isAdmin } from "../middlewares/auth.js";


// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);

//Route for signup
router.post("/signup", signUp);

//Route login
router.post("/login", login);

// Route for Changing the password
router.put("/changepassword", auth, changePassword)



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

//Route for reset password token
router.post("/reset-password-token", resetPasswordToken);

//Route for reset password
router.post("/reset-password", resetPassword);


import { createRating } from "../controllers/RatingAndReviews.js";
router.post("/createRating", createRating);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
