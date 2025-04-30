import Category from "../models/Category.js";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//create Category
export const createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;

    //valdiation
    if (!name || !description) {
      return res.status(403).json({
        success: false,
        message: "All Field are required",
      });
    }

    //create entry in DB
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Category created successflly",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      succeess: false,
      message: error.message,
    });
  }
};

//getAllCategorys handler function
export const showAllCategories = async (req, res) => {
  try {
    // console.log("INSIDE SHOW ALL CATEGORIES");
    const allCategorys = await Category.find({});
    // console.log(allCategorys)
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails
export const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    // console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          {
            path: "ratingAndReviews",
            model: "RatingAndReview"
          },
          {
            path: "courseContent", // Only populate Section level
            model: "Section"
          },
          {
            path: "instructor", // <- Populating the instructor
            model: "User" // Assuming your instructor is from the User model
          }
        ],
      })
      .exec()

    // Add averageRating to each course
    let averageRatingsByCourseId = {};

    if (selectedCategory && selectedCategory.courses) {
      selectedCategory.courses.forEach(course => {
        const totalRatings = course.totalrating || 0;
        const totalReviews = course.ratingAndReviews?.length || 0;

        const averageRating = totalReviews > 0
          ? (totalRatings / totalReviews).toFixed(1)
          : "0.0";

        averageRatingsByCourseId[course._id.toString()] = parseFloat(averageRating);
      });
    }
    
    let courseDurationsById = {};
    if (selectedCategory && selectedCategory.courses) {
      selectedCategory.courses.forEach(course => {
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

    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      // console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      // console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec()

    //console.log("Different COURSE", differentCategory)
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec()
    // Sort the courses based on number of students enrolled (highest first)
    const mostSellingCourses = selectedCategory.courses
      .sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length)
      .slice(0, 10); // pick first 3 courses

    const mostPopularCourses = selectedCategory.courses
      .sort((a, b) => b.totalrating - a.totalrating) // Sort descending by totalRating
      .slice(0, 10); // Take top 5 courses

    const newestCourses = selectedCategory.courses
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
      .slice(0, 10); // Take top 5

    // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
        mostPopularCourses,
        newestCourses,
        averageRatingsByCourseId,
        courseDurationsById
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}