// Import the required modules
import express from "express";
const router = express.Router();
import {contactUsController} from "../controllers/ContactUS.js"
import { auth, isAdmin } from "../middlewares/auth.js";

import { getAllPendingMessage } from "../controllers/ContactUS.js";
import { getAllRespondedMessage } from "../controllers/ContactUS.js";
import { respondToMessage } from "../controllers/ContactUS.js";

router.post("/contact", auth, contactUsController)
router.get("/getAllPendingMessage", getAllPendingMessage)
router.get("/getAllRespondedMessage", getAllRespondedMessage)
router.post("/respondToMessage",respondToMessage)
export default router;