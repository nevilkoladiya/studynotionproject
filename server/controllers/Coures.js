import User from "../models/User.js";
import Category from "../models/Category.js";
import Section from "../models/Section.js";
import Course from "../models/Course.js";
import SubSection from "../models/SubSection.js";
import CourseProgress from "../models/CourseProgress.js";
import dotnev, { populate } from "dotenv";
dotnev.config();
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";

export const createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;
    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    // console.log("tag", tag)
    // console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor // just trusting GPT
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    // const instructorDetails = await User.findOne({
    //   _id: userId,
    //   accountType: "Instructor",
    // });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Edit Course Details
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all courses
export const getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find({}); //change the below statement

    return res.status(200).json({
      success: true,
      message: "Data for all Courses successfully",
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      succeess: false,
      message: "Cannot find the all courses",
      error: error.message,
    });
  }
};

//getCoursesDetails
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
export const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
// Delete the Course
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);
    const instructorId = course.instructor;
    //remove course
    await User.findByIdAndUpdate(
      {
        _id: instructorId,
      },
      {
        $pull: {
          courses: course._id,
        },
      },
      { new: true }
    );

    //remove course from category
    const category = course.category;
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// export const getInstructorCourses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let userDetails = await User.findOne({
//       _id: userId,
//     })
//       .populate({
//         path: "courses",
//         populate: {
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec()
//       // .sort({ createdAt: -1 });

//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       });
//     }

//     let courses = userDetails.courses;
//     if (!courses) {
//       return res.status(400).json({
//         success: false,
//         message: `Your are not created any courses id: ${userDetails}`,
//       });
//     }
//     courses = courses.toObject();

//     for (var i = 0; i < userDetails.courses.length; i++) {
//       let timeDuration = 0;
//       for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
//         timeDuration += userDetails.courses[i].courseContent[
//           j
//         ].subSection.reduce(
//           (acc, curr) => acc + parseInt(curr.timeDuration),
//           0
//         );
//       }
//       const totalDuration = convertSecondsToDuration(timeDuration);
//       courses[i].timeDuration = totalDuration;
//       console.log("time",timeDuration);
//     }
//     return res.status(200).json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const timeDuration = async (req, res) => {
  try {
    // console.log(req.body.courseId)
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "all details are required",
      });
    }

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // console.log("course", course);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: `Course not found`,
      });
    }

    let totalDurationInSeconds = 0;
    course.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    // console.log(totalDuration);
    return res.status(200).json({
      success: true,
      data: totalDuration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    const courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getMostSellingCourses = async (req, res) => {
//   try {
//     // Fetch top 10 courses with most students enrolled
//     const mostSellingCourses = await Course.aggregate([
//       {
//         $match: {
//           status: "Published",
//         },
//       },
//       {
//         $addFields: {
//           enrolledCount: {
//             $size: "$studentEnrolled", // Use $size directly on the studentEnrolled array
//           },
//         },
//       },
//       {
//         $sort: {
//           enrolledCount: -1, // Sort by most enrolled students
//         },
//       },
//       {
//         $limit: 10, // Fetch top 10 most selling courses
//       },
//       // Join instructor details
//       {
//         $lookup: {
//           from: "users", // Assuming "users" is the name of the user collection
//           localField: "instructor",
//           foreignField: "_id",
//           as: "instructor",
//         },
//       },
//       {
//         $unwind: "$instructor", // Flatten the instructor object
//       },
//       // Join reviews
//       {
//         $lookup: {
//           from: "ratingandreviews", // Assuming "ratingandreviews" is the name of the reviews collection
//           localField: "_id",
//           foreignField: "course",
//           as: "reviews",
//         },
//       },
//       {
//         $addFields: {
//           averageRating: {
//             $cond: [
//               { $gt: [{ $size: "$reviews" }, 0] },
//               {
//                 $divide: [
//                   { $floor: { $multiply: [{ $avg: "$reviews.rating" }, 10] } },
//                   10,
//                 ],
//               },
//               null,
//             ],
//           },
//           totalReviews: { $size: "$reviews" },
//         },
//       },
//       {
//         $project: {
//           courseName: 1,
//           courseDescription: 1,
//           thumbnail: 1,
//           enrolledCount: 1,
//           averageRating: 1,
//           totalReviews: 1,
//           instructor: {
//             firstName: "$instructor.firstName",
//             lastName: "$instructor.lastName",
//             email: "$instructor.email",
//           },
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Top selling courses fetched successfully",
//       data: mostSellingCourses,
//     });
//   } catch (error) {
//     console.error("Error fetching top selling courses:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch most selling courses",
//     });
//   }
// };

// export const getTopShortCourses = async (req, res) => {
//   try {
//     const shortCourses = await Course.aggregate([
//       // Join sections to calculate total duration
//       {
//         $lookup: {
//           from: "sections",
//           localField: "courseContent",
//           foreignField: "_id",
//           as: "sections",
//         },
//       },
//       {
//         $match: {
//           status: "Published",
//         },
//       },
//       {
//         $addFields: {
//           totalDurationInSeconds: { $sum: "$sections.totalDuration" },
//         },
//       },

//       // Join instructor details
//       {
//         $lookup: {
//           from: "users",
//           localField: "instructor",
//           foreignField: "_id",
//           as: "instructorDetails",
//         },
//       },
//       {
//         $unwind: "$instructorDetails",
//       },

//       // Join ratings
//       {
//         $lookup: {
//           from: "ratingandreviews",
//           localField: "_id",
//           foreignField: "course",
//           as: "reviews",
//         },
//       },
//       {
//         $addFields: {
//           averageRating: { $avg: "$reviews.rating" },
//           totalReviews: { $size: "$reviews" },
//         },
//       },

//       // Sort and limit to top 10 short courses
//       {
//         $sort: {
//           totalDurationInSeconds: 1,
//         },
//       },
//       {
//         $limit: 10,
//       },

//       // Final projection
//       {
//         $project: {
//           courseName: 1,
//           courseDescription: 1,
//           thumbnail: 1,
//           totalDuration: {
//             $concat: [
//               { $toString: { $floor: { $divide: ["$totalDurationInSeconds", 60] } } },
//               " mins",
//             ],
//           },
//           averageRating: { $round: ["$averageRating", 1] },
//           totalReviews: 1,
//           instructor: {
//             firstName: "$instructorDetails.firstName",
//             lastName: "$instructorDetails.lastName",
//             email: "$instructorDetails.email",
//           },
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Top 10 shortest courses fetched successfully",
//       data: shortCourses,
//     });
//   } catch (error) {
//     console.error("Error fetching short courses:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch top short-length courses",
//     });
//   }
// };

export const getNewlyCreatedCourses = async (req, res) => {
  try {
    // Fetch the top 10 newly created courses
    const newlyCreatedCourses = await Course.find({ status: "Published" })
      .sort({ createdAt: -1 }) // Sort by most recently created
      .limit(10) // Fetch top 10
      .populate("instructor") // Populate instructor details
      .populate("ratingAndReviews") // Optional: populate rating and reviews
      .exec();

    // If the courses are found, return success with courses
    return res.status(200).json({
      success: true,
      message: "Top newly created courses fetched successfully",
      data: newlyCreatedCourses,
    });
  } catch (error) {
    console.error("Error fetching top newly created courses:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch newly created courses",
    });
  }
};

export const getMostPopularCourses = async (req, res) => {
  try {
    // Fetch top 10 courses sorted by totalrating in descending order (most popular)
    const mostPopularCourses = await Course.find({ status: "Published" })
      .sort({ totalrating: -1 }) // Sort by highest totalrating (most popular)
      .limit(10) // Limit to top 10 courses
      .populate("instructor") // Populate instructor details
      .populate("ratingAndReviews") // Optional: populate rating and reviews
      .exec();

    // If the courses are found, return success with courses
    return res.status(200).json({
      success: true,
      message: "Top popular courses fetched successfully",
      data: mostPopularCourses,
    });
  } catch (error) {
    console.error("Error fetching most popular courses:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch most popular courses",
    });
  }
};

export const getMostSellingCourses = async (req, res) => {
  try {
    // Find published courses and sort by number of students enrolled (most selling)
    const mostSellingCourses = await Course.find({ status: "Published" })
      .sort({ studentEnrolled: -1 }) // Sort by number of students (most to least)
      .limit(10) // Top 10 courses
      .populate("instructor", "firstName lastName email") // Only selected instructor fields
      .populate("ratingAndReviews") // Populate review documents
      .exec();

    // Return the data
    return res.status(200).json({
      success: true,
      message: "Top selling courses fetched successfully",
      data: mostSellingCourses,
    });
  } catch (error) {
    console.error("Error fetching top selling courses:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch most selling courses",
    });
  }
};

export const getTopShortCourses = async (req, res) => {
  try {
    const shortCourses = await Course.aggregate([
      {
        $match: {
          status: "Published",
        },
      },
      {
        $lookup: {
          from: "sections",
          localField: "courseContent",
          foreignField: "_id",
          as: "sections",
        },
      },
      {
        $addFields: {
          totalDuration: {
            $sum: "$sections.timeDuration",
          },
        },
      },
      {
        $match: {
          totalDuration: { $lt: 1800 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: "$instructor",
      },
      {
        $lookup: {
          from: "ratingandreviews",
          localField: "_id",
          foreignField: "course",
          as: "ratingAndReviews",
        },
      },
      {
        $project: {
          courseName: 1,
          totalDuration: 1,
          thumbnail: 1,
          price: 1,
          instructor: {
            firstName: "$instructor.firstName",
            lastName: "$instructor.lastName",
            email: "$instructor.email",
          },
          ratingAndReviews: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Courses with duration < 30 minutes fetched successfully",
      data: shortCourses,
    });
  } catch (error) {
    console.error("Error fetching short duration courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch short courses",
    });
  }
};


//get all courses
export const getCoursesByTag = async (req, res) => {
  try {
    const { tag } = req.body; // Or req.query if you're sending via URL query
    if (!tag) {
      return res.status(400).json({ success: false, message: "Tag is required" });
    }
    const courses = await Course.find({
      tag: tag,
      status: "Published"
    })
      .populate("ratingAndReviews")
      .populate("courseContent") // Sections
      .populate("instructor", "firstName lastName email") // Only select fields
      .exec();

    let averageRatingsByCourseId = {};
    if (courses) {
      courses.forEach(course => {
        const totalRatings = course.totalrating || 0;
        const totalReviews = course.ratingAndReviews?.length || 0;

        const averageRating = totalReviews > 0
          ? (totalRatings / totalReviews).toFixed(1)
          : "0.0";

        averageRatingsByCourseId[course._id.toString()] = parseFloat(averageRating);
      });
    }
    console.log(averageRatingsByCourseId);

    let courseDurationsById = {};
    if (courses) {
      courses.forEach(course => {
        let totalSeconds = 0;
        // Sum timeDuration (in seconds) from each section in courseContent
        if (Array.isArray(course.courseContent)) {
          course.courseContent.forEach(section => {
            if (typeof section.timeDuration === 'number') {
              totalSeconds += section.timeDuration;
            }
          });
        }
        // Ensure totalSeconds is an integer
        totalSeconds = Math.round(totalSeconds);
        // Convert totalSeconds into hours, minutes, and seconds
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        // Format: "Xhr Ymin Zsec" (omit zero parts dynamically)
        let formattedParts = [];
        if (hours > 0) formattedParts.push(`${hours}hr`);
        if (minutes > 0) formattedParts.push(`${minutes}min`);
        if (seconds > 0 || formattedParts.length === 0) formattedParts.push(`${seconds}sec`);
        const formattedDuration = formattedParts.join(' ');
        // Save in object by course ID
        courseDurationsById[course._id.toString()] = {
          totalSeconds,
          formatted: formattedDuration
        };
      });
    }
    console.log("Course Durations By ID:", courseDurationsById);


    res.status(200).json({
      success: true,
      data: {
        courses,
        averageRatingsByCourseId,
        courseDurationsById
      }
    });
  } catch (error) {
    console.error("Error fetching courses by tag:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
