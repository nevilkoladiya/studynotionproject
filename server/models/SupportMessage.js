import mongoose from "mongoose";

const supportMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to your User model
    required: true,
  },
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phoneNo: { 
    type: String 
  },
  countrycode: { 
    type: String 
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  response: {
    type: String,
    default: null,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "responded"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SupportMessage", supportMessageSchema);
