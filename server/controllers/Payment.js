import { instance } from "../config/razorpay.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import CourseProgress from "../models/CourseProgress.js";
import mailSender from "../utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import {paymentSuccessEmail} from "../mail/templates/paymentSuccessEmail.js"
import { default as mongoose } from "mongoose";
import crypto from "crypto" 
import dotenv from "dotenv";
dotenv.config();

// Capture the payment and initiate the Razorpay order
export const capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id

  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0
  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(String(userId))
      if (course.studentEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }
  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    // console.log(paymentResponse)
    res.json({
      success: true,
      message:paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
export const verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  console.log("body",body)
  console.log("razorpay_signature",razorpay_signature)

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  console.log("expectedSignature",expectedSignature)

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
export const sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideo: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}

//capture the payment and initiate the razorpay order
// export const capturePayment = async (req, res) => {
//   //get course id and userid
//   const { course_id } = req.body;
//   const userId = req.user.id;

//   //validation
//   //validation courseId
//   if (!course_id) {
//     return res.status(403).json({
//       success: false,
//       message: "Missinhg Properties",
//     });
//   }

//   //valid coursedetail
//   let course;
//   try {
//     course = await Course.findById(course_id);
//     if (!course) {
//       return res.status(403).json({
//         success: false,
//         message: "Missinhg course Properties",
//       });
//     }

//     //user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: true,
//         message: "Student already enrolled",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }

//   //order created
//   const amount = course.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: course_id,
//       userId,
//     },
//   };

//   try {
//     //initiate the payment using razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     //return response
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "some error accour in payment capture",
//       error: error.message,
//     });
//   }
// };

//verify signature of razorpay and server
// export const verifySignature = async (req, res) => {
//   const webhookSecret = "123456789";

//   const signature = req.headers("x-razorpay-signature");

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment is Autorised");

//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       //fulfil the action

//       //find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentEnrolled: userId } },
//         { new: true }
//       );

//       if (enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course not found",
//         });
//       }
//       console.log(enrolledCourse);

//       //find the student anded the course to their list enrolled courses me
//       const enrolledStudent = await User.findByIdAndUpdate(
//         { _id: userId },
//         { $push: { course: courseId } },
//         { new: true }
//       );

//       console.log(enrolledStudent);

//       //mail send krdo confirmation wala
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulations from StudyNotion",
//         "Congratulations,you are onboarded into new StudyNotion Course"
//       );

//       console.log(emailResponse);
//       return res.status(200).json({
//         success: true,
//         message: "Signature Verified and Coursed Added",
//       });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
//   }
//   else{
//     return res.status(400).json({
//         success:false,
//         message:'Invalid reqest'
//     })
//   }
// };
