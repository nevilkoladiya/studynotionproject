// Import the required modules
import express from "express";
const router = express.Router();

import {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} from "../controllers/Payment.js";

// Importing Middlewares
import { auth, isStudent } from "../middlewares/auth.js";

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail );

export default router;
