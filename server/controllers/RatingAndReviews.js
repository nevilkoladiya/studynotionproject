import RatingAndReview from "../models/RatingAndReview.js";
import Course from "../models/Course.js";
import { mongo, default as mongoose } from "mongoose";

//create rating
export const createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //fetchdata from req body
    const { rating, review, courseId } = req.body;

    if(!rating || !review || !courseId){
      return res.status(404).json({
        success: false,
        message: "All field required",
      });
    }
    //check if user is enrolled or not

    // console.log(userId);

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    console.log(courseDetails);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }
    //check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }
    // create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    //update course with this rating/review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
        $inc: { totalrating: rating }, // ⭐ INCREMENT totalrating
      },
      { new: true }
    );
    // console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAverage Rating
export const getAverageRating = async (req, res) => {
  try {
    //get courseId
    const courseId = req.body.courseId;

    //calculate avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(String(courseId)),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating/review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0 , no Rating on this course",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      succeess: false,
      message: error.message,
    });
  }
};

//getAllRatingAndReviews
export const getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      succeess: false,
      message: error.message,
    });
  }
};
