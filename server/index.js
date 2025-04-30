import express from "express";
const app = express();

import userRoutes from "./routers/User.js";
import profileRoutes from "./routers/Profile.js";
import paymentRoutes from "./routers/Payment.js";
import courseRoutes from "./routers/Course.js";
import contactUsRoute from "./routers/Contact.js"

import dotenv from "dotenv";
dotenv.config();

//database connect
import  connect  from "./config/database.js";
connect();

import cookieParser from "cookie-parser";
import cors from "cors";

//cloudinary connection
import { cloudinaryConnect } from "./config/cloudinary.js";
cloudinaryConnect();

import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and runnig",
  });
});

app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
