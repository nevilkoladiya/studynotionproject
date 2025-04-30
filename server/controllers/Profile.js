import Course from "../models/Course.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import CourseProgress from "../models/CourseProgress.js";
import dotenv from "dotenv";
dotenv.config();
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const updateProfile = async (req, res) => {
  try {
    //fetch data
    const {
      lastName = "",
      firstName = "",
      dateOfBirth = null,
      about = "",
      contactNumber,
      gender,
    } = req.body;

    //get userId
    const id = req.user.id;

    //validation
    if (!id) {
      return res.status(403).json({
        success: false,
        message: "Missinhg Properties",
      });
    }

    //find Profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update user
    if (firstName != "") {
      const user = await User.findByIdAndUpdate(id, {
        firstName,
      });
      await user.save();
    }
    if (lastName != "") {
      const user = await User.findByIdAndUpdate(id, {
        lastName,
      });
      await user.save();
    }

    //update profile
    if (dateOfBirth != "") {
      profileDetails.dateOfBirth = dateOfBirth;
    }
    if (about != "") {
      profileDetails.about = about;
    }
    if (gender != "") {
      profileDetails.gender = gender;
    }
    if (contactNumber != "") {
      profileDetails.contactNumber = contactNumber;
    }
    await profileDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Successfully Profile Update",
      updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete account
//Explore ->how can we schedule deletion operation
export const deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    //validation
    const userDetails = await User.findById({ _id: id });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //unenroll user from all enroll course
    const enrolledCourses = userDetails.courses;
    // console.log("Enroll course",enrolledCourses);

    for (const i = 0; i < enrolledCourses.length; i++) {
      await Course.findByIdAndUpdate(
        enrolledCourses[i],
        {
          $pull: {
            studentEnrolled: id,
          },
        },
        { new: true }
      );
    }

    //delete user
    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to delete user , please try again",
      error: error.message,
    });
  }
};

export const getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    //validation
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Successfully fetch Profile Data",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to get Profiledata , please try again",
      error: error.message,
    });
  }
};

//update profile picture
export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    console.log(displayPicture);
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    // console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("erro aa raha he");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
      
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      userDetails.courses[i].totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
      );
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails._id}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}