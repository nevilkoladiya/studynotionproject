import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";

export const auth = (req, res, next) => {
  try {
    //extract token
    const token =
    req.body.token ||
    req.cookies.token ||
    req.header("Authorization").replace("Bearer ", "");
    // console.log("token",token)
    
    //if token missing,then response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    // console.log(token+"123");
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = decode; // making user field in req that other middleware access decoded payload
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid !! please logout and again login",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//isstudent
export const isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only",
            })
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "User role cannot be verify !please try again",
        });
      }
} 


//isInstructor
export const isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for instrutor only",
            })
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "User role cannot be verify !please try again",
        });
      }
} 


//isAdmin
export const isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin only",
            })
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "User role cannot be verify !please try again",
        });
      }
} 