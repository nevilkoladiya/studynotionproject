
// export const signUp = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       accountType,
//       otp,
//     } = req.body;

//     //validation
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !otp
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     //both password is same or not
//     if (password != confirmPassword) {
//       return res.status(403).json({
//         success: false,
//         message: "Confirm Password and Password are not matched",
//       });
//     }

//     //check user already exist or not
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already Registered",
//       });
//     }

//     //find most recent OTP stored for the user
//     const recentOtp = await OTP.find({ email })
//       .sort({ createdAt: -1 })
//       .limit(1);
//     console.log("OTP", recentOtp);

//     //validate otp
//     if (recentOtp.length == 0) {
//       //opt not found
//       return res.status(400).json({
//         success: false,
//         message: "OTP not Found",
//       });
//     } else if (otp != recentOtp[0].otp) {
//       //invalid OTP
//       return res.status(400).json({
//         success: false,
//         message: "OTP is not Matched",
//       });
//     }

//     //hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     let approved = "";
//     approved === "Instructor" ? (approved = false) : (approved = true);

//     //entry create in db
//     const profileDetails = await Profile.create({
//       gender: null,
//       dateOfBirth: null,
//       about: null,
//       contactNumber: null,
//     });

//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       accountType,
//       approved: approved,
//       additionalDetails: profileDetails._id,
//       image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//     });

//     return res.status(200).json({
//       success: true,
//       user,
//       message: "User is registered Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "User cannot be registerd. Please try again",
//     });
//   }
// };